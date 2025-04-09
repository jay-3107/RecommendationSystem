from flask import Flask, request, jsonify
from Rengine import RecommendationEngine
import asyncio
from functools import wraps
from typing import List, Dict, Any
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Initialize recommendation engine
engine = RecommendationEngine("database.db")

def async_endpoint(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        return asyncio.run(f(*args, **kwargs))
    return wrapped

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Recommendation API is running'
    })

@app.route('/api/recommendations/search', methods=['POST'])
@async_endpoint
async def search_recommendations():
    """Get recommendations based on search terms"""
    try:
        data = request.get_json()
        
        if not data or 'search_terms' not in data:
            return jsonify({
                'error': 'Missing search_terms in request body'
            }), 400
            
        search_terms: List[str] = data['search_terms']
        
        if not isinstance(search_terms, list):
            return jsonify({
                'error': 'search_terms must be a list of strings'
            }), 400
        
        results = await engine.get_recommendations(search_terms=search_terms)
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': f'Error processing search recommendations: {str(e)}'
        }), 500

@app.route('/api/recommendations/complementary', methods=['POST'])
@async_endpoint
async def complementary_recommendations():
    """Get complementary product recommendations"""
    try:
        data = request.get_json()
        
        if not data or 'purchased_item' not in data:
            return jsonify({
                'error': 'Missing purchased_item in request body'
            }), 400
            
        purchased_item: str = data['purchased_item']
        
        results = await engine.get_recommendations(purchased_item=purchased_item)
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': f'Error processing complementary recommendations: {str(e)}'
        }), 500

@app.route('/api/recommendations/preferences', methods=['POST'])
@async_endpoint
async def preferences_recommendations():
    """Get recommendations based on category preferences"""
    try:
        data = request.get_json()
        
        if not data or 'preferred_categories' not in data:
            return jsonify({
                'error': 'Missing preferred_categories in request body'
            }), 400
            
        preferred_categories: List[str] = data['preferred_categories']
        num_recommendations: int = data.get('num_recommendations', 20)
        
        if not isinstance(preferred_categories, list):
            return jsonify({
                'error': 'preferred_categories must be a list of strings'
            }), 400
            
        if not isinstance(num_recommendations, int) or num_recommendations < 1:
            return jsonify({
                'error': 'num_recommendations must be a positive integer'
            }), 400
        
        results = await engine.recommend_by_preferences(
            preferred_categories=preferred_categories,
            num_recommendations=num_recommendations
        )
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': f'Error processing preferences recommendations: {str(e)}'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)