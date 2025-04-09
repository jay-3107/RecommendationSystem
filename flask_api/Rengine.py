from typing import List, Dict, Any, Optional
from langchain.agents import create_sql_agent
from langchain.agents.agent_types import AgentType
from langchain.sql_database import SQLDatabase
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
from pydantic import BaseModel, Field
import json
import sqlite3

# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# Define output schemas
class Product(BaseModel):
    title: str = Field(description="Product title")
    category: str = Field(description="Product category")
    average_rating: float = Field(description="Average product rating")
    rating_count: int = Field(description="Number of ratings")

class RecommendationResponse(BaseModel):
    products: List[Product] = Field(description="List of recommended products")
    reasoning: Optional[str] = Field(description="Reasoning behind recommendations")

class RecommendationEngine:
    def __init__(self, db_path: str, model_name: str = "llama-3.3-70b-versatile"):
        self.db_path = db_path
        self.db = SQLDatabase.from_uri(f"sqlite:///{db_path}")
        self.llm = ChatGroq(
            temperature=0.1,
            model_name="llama-3.3-70b-versatile",
            groq_api_key=groq_api_key,
            max_tokens=2048
        )
        
        self.toolkit = SQLDatabaseToolkit(db=self.db, llm=self.llm)
        self.agent = create_sql_agent(
            llm=self.llm,
            toolkit=self.toolkit,
            agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True
        )

    def _create_prompt(self, context: str) -> str:
        return f"""
        You are a recommendation engine expert. Using the SQL database, find relevant products based on the provided context.
        
        Database Schema:
        Table: users
        Columns: main_category, title, average_rating, rating_number, category
        
        Context: {context}
        
        Requirements:
        1. Query the database to find relevant products
        2. Filter for products with average_rating >= 4.0
        3. Sort by rating_number for popularity
        4. Return EXACTLY 5 products
        
        Return ONLY a JSON string in this format:
        {{
            "products": [
                {{
                    "title": "Example Product",
                    "category": "Example Category",
                    "average_rating": 4.5,
                    "rating_count": 1000
                }}
            ],
            "reasoning": "Brief explanation of recommendations"
        }}
        """

    def _get_db_connection(self):
        """Create a direct database connection"""
        return sqlite3.connect(self.db_path)

    async def get_recommendations(self, 
                                search_terms: List[str] = None, 
                                purchased_item: str = None) -> Dict[str, Any]:
        """Get recommendations based on either search terms or purchased item"""
        try:
            # Create context based on input type
            if search_terms:
                context = f"Find products matching these search terms: {', '.join(search_terms)}"
            elif purchased_item:
                context = f"Find complementary products for: {purchased_item}"
            else:
                raise ValueError("Either search_terms or purchased_item must be provided")

            # Get recommendations from agent
            prompt = self._create_prompt(context)
            result = await self.agent.arun(prompt)

            # Clean and parse the response
            json_str = result
            if "```json" in result:
                json_str = result.split("```json")[1].split("```")[0]
            elif "```" in result:
                json_str = result.split("```")[1]

            # Parse JSON and validate against schema
            parsed_data = json.loads(json_str)
            response = RecommendationResponse(**parsed_data)
            return response.model_dump()

        except Exception as e:
            return RecommendationResponse(
                products=[],
                reasoning=f"Error processing recommendations: {str(e)}"
            ).model_dump()

    async def recommend_by_preferences(
        self, 
        preferred_categories: List[str], 
        num_recommendations: int = 20
    ) -> Dict[str, Any]:
        """
        Get recommendations based on user category preferences using direct SQL query
        """
        try:
            # Create database connection
            conn = self._get_db_connection()
            cursor = conn.cursor()
            
            # Create parameterized query
            placeholders = ','.join('?' * len(preferred_categories))
            query = f"""
            SELECT 
                title,
                category,
                average_rating,
                rating_number
            FROM 
                users
            WHERE 
                main_category IN ({placeholders})
                AND average_rating >= 4.0
            ORDER BY 
                average_rating DESC,
                rating_number DESC
            LIMIT ?
            """
            
            # Execute query with parameters
            cursor.execute(query, preferred_categories + [num_recommendations])
            rows = cursor.fetchall()
            
            # Convert rows to products
            products = [
                Product(
                    title=row[0],
                    category=row[1],
                    average_rating=float(row[2]),
                    rating_count=int(row[3])
                ).model_dump()
                for row in rows
            ]
            
            response = RecommendationResponse(
                products=products,
                reasoning=f"Found {len(products)} top-rated products in categories: {', '.join(preferred_categories)}"
            )
            
            # Close connection
            conn.close()
            
            return response.model_dump()

        except Exception as e:
            return RecommendationResponse(
                products=[],
                reasoning=f"Error getting preferences-based recommendations: {str(e)}"
            ).model_dump()

async def run_example():
    engine = RecommendationEngine("database.db")

    # Example: Search-based recommendations
    search_results = await engine.get_recommendations(search_terms=["yoga mat", "running shoes"])
    print("\nSearch Results:", json.dumps(search_results, indent=2))
    
    # # Example: Complementary product recommendations
    complementary_results = await engine.get_recommendations(purchased_item="smartphone")
    print("\nComplementary Products:", json.dumps(complementary_results, indent=2))
    
    # Example: Preferences-based recommendations
    preferences_results = await engine.recommend_by_preferences(
        preferred_categories=["Electronics", "Books"],
        num_recommendations=10
    )
    print("\nPreferences-Based Recommendations:", json.dumps(preferences_results, indent=2))