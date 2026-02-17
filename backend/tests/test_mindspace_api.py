"""
MindSpace API Tests - Backend Testing
Tests for auth, beta signup, and reflections endpoints
"""
import pytest
import requests
import os
import uuid

# Base URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test user credentials
TEST_EMAIL = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
TEST_PASSWORD = "TestPass123!"


class TestAPIRoot:
    """Test basic API connectivity"""
    
    def test_api_root(self):
        """Test API root endpoint returns running message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "running" in data["message"].lower()
        print(f"✓ API Root: {data['message']}")


class TestAuthEndpoints:
    """Test authentication endpoints: /signup, /login, /me, /access-check"""
    
    @pytest.fixture(scope="class")
    def test_user(self):
        """Create a unique test user for auth tests"""
        email = f"TEST_auth_{uuid.uuid4().hex[:8]}@example.com"
        password = "TestPassword123!"
        return {"email": email, "password": password}
    
    def test_signup_success(self, test_user):
        """Test POST /api/auth/signup returns token and user data"""
        response = requests.post(
            f"{BASE_URL}/api/auth/signup",
            json={"email": test_user["email"], "password": test_user["password"]}
        )
        assert response.status_code == 200, f"Signup failed: {response.text}"
        
        data = response.json()
        # Verify response structure
        assert "access_token" in data, "Missing access_token in response"
        assert "user" in data, "Missing user in response"
        assert data["user"]["email"] == test_user["email"]
        assert "id" in data["user"]
        assert "has_paid" in data["user"]
        assert "is_beta_tester" in data["user"]
        assert "free_reflections_used" in data["user"]
        
        # Store token for later tests
        test_user["token"] = data["access_token"]
        test_user["user_id"] = data["user"]["id"]
        
        print(f"✓ Signup success for {test_user['email']}")
    
    def test_signup_duplicate_email(self, test_user):
        """Test signup with existing email returns 400"""
        response = requests.post(
            f"{BASE_URL}/api/auth/signup",
            json={"email": test_user["email"], "password": test_user["password"]}
        )
        assert response.status_code == 400, f"Expected 400 for duplicate email, got {response.status_code}"
        data = response.json()
        assert "detail" in data
        print(f"✓ Duplicate email rejected correctly")
    
    def test_login_success(self, test_user):
        """Test POST /api/auth/login returns token and user data"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": test_user["email"], "password": test_user["password"]}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == test_user["email"]
        
        # Update token
        test_user["token"] = data["access_token"]
        print(f"✓ Login success for {test_user['email']}")
    
    def test_login_invalid_credentials(self):
        """Test login with wrong credentials returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "nonexistent@example.com", "password": "wrongpass"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ Invalid login rejected correctly")
    
    def test_login_wrong_password(self, test_user):
        """Test login with wrong password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": test_user["email"], "password": "WrongPassword123!"}
        )
        assert response.status_code == 401
        print("✓ Wrong password rejected correctly")
    
    def test_get_me_authenticated(self, test_user):
        """Test GET /api/auth/me returns user info when authenticated"""
        headers = {"Authorization": f"Bearer {test_user['token']}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        
        assert response.status_code == 200, f"Get user failed: {response.text}"
        data = response.json()
        assert data["email"] == test_user["email"]
        assert "id" in data
        print(f"✓ Get user info success: {data['email']}")
    
    def test_get_me_unauthenticated(self):
        """Test GET /api/auth/me without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("✓ Unauthenticated /me rejected correctly")
    
    def test_get_me_invalid_token(self):
        """Test GET /api/auth/me with invalid token returns 401"""
        headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 401
        print("✓ Invalid token rejected correctly")
    
    def test_access_check_authenticated(self, test_user):
        """Test GET /api/auth/access-check returns beta access for authenticated users"""
        headers = {"Authorization": f"Bearer {test_user['token']}"}
        response = requests.get(f"{BASE_URL}/api/auth/access-check", headers=headers)
        
        assert response.status_code == 200, f"Access check failed: {response.text}"
        data = response.json()
        
        # During beta, everyone should have access
        assert data["has_access"] == True, "Expected has_access to be True during beta"
        assert data["reason"] == "beta_period"
        assert "message" in data
        print(f"✓ Access check: has_access={data['has_access']}, reason={data['reason']}")
    
    def test_access_check_unauthenticated(self):
        """Test GET /api/auth/access-check without token returns 401"""
        response = requests.get(f"{BASE_URL}/api/auth/access-check")
        assert response.status_code == 401
        print("✓ Unauthenticated access-check rejected correctly")


class TestBetaSignupEndpoints:
    """Test beta signup endpoints"""
    
    def test_beta_signup_new_email(self):
        """Test POST /api/beta-signup with new email"""
        unique_email = f"TEST_beta_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/beta-signup",
            json={"email": unique_email}
        )
        
        assert response.status_code == 200, f"Beta signup failed: {response.text}"
        data = response.json()
        assert data["success"] == True
        assert "Thank you" in data["message"] or "already" in data["message"]
        assert data["email"] == unique_email
        print(f"✓ Beta signup success: {unique_email}")
    
    def test_beta_signup_duplicate_email(self):
        """Test POST /api/beta-signup with duplicate email returns success with different message"""
        email = f"TEST_beta_dup_{uuid.uuid4().hex[:8]}@example.com"
        
        # First signup
        response1 = requests.post(f"{BASE_URL}/api/beta-signup", json={"email": email})
        assert response1.status_code == 200
        
        # Second signup - should return success but different message
        response2 = requests.post(f"{BASE_URL}/api/beta-signup", json={"email": email})
        assert response2.status_code == 200
        data = response2.json()
        assert data["success"] == True
        assert "already" in data["message"].lower()
        print("✓ Duplicate beta signup handled correctly")
    
    def test_get_beta_signups(self):
        """Test GET /api/beta-signups returns list of signups"""
        response = requests.get(f"{BASE_URL}/api/beta-signups")
        
        assert response.status_code == 200, f"Get beta signups failed: {response.text}"
        data = response.json()
        assert data["success"] == True
        assert "count" in data
        assert "signups" in data
        assert isinstance(data["signups"], list)
        print(f"✓ Get beta signups: {data['count']} signups found")


class TestReflectionsEndpoints:
    """Test reflection-related endpoints"""
    
    @pytest.fixture(scope="class")
    def auth_user(self):
        """Create authenticated user for reflection tests"""
        email = f"TEST_reflection_{uuid.uuid4().hex[:8]}@example.com"
        password = "TestPassword123!"
        
        # Signup
        response = requests.post(
            f"{BASE_URL}/api/auth/signup",
            json={"email": email, "password": password}
        )
        assert response.status_code == 200
        data = response.json()
        
        return {
            "email": email,
            "token": data["access_token"],
            "user_id": data["user"]["id"]
        }
    
    def test_increment_free_usage_authenticated(self, auth_user):
        """Test POST /api/reflections/increment-free-usage for authenticated user"""
        headers = {"Authorization": f"Bearer {auth_user['token']}"}
        response = requests.post(
            f"{BASE_URL}/api/reflections/increment-free-usage",
            headers=headers
        )
        
        assert response.status_code == 200, f"Increment usage failed: {response.text}"
        data = response.json()
        assert data["success"] == True
        print(f"✓ Increment free usage success: {data}")
    
    def test_increment_free_usage_unauthenticated(self):
        """Test POST /api/reflections/increment-free-usage without token returns 401"""
        response = requests.post(f"{BASE_URL}/api/reflections/increment-free-usage")
        assert response.status_code == 401
        print("✓ Unauthenticated increment-free-usage rejected correctly")


class TestStatusEndpoints:
    """Test status check endpoints"""
    
    def test_post_status(self):
        """Test POST /api/status creates status check"""
        response = requests.post(
            f"{BASE_URL}/api/status",
            json={"client_name": "TEST_status_client"}
        )
        
        assert response.status_code == 200, f"Post status failed: {response.text}"
        data = response.json()
        assert "id" in data
        assert data["client_name"] == "TEST_status_client"
        print(f"✓ Status check created: {data['id']}")
    
    def test_get_status(self):
        """Test GET /api/status returns status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        
        assert response.status_code == 200, f"Get status failed: {response.text}"
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Get status checks: {len(data)} checks found")


# Additional edge case tests
class TestEdgeCases:
    """Test edge cases and validation"""
    
    def test_signup_invalid_email(self):
        """Test signup with invalid email format"""
        response = requests.post(
            f"{BASE_URL}/api/auth/signup",
            json={"email": "invalid-email", "password": "TestPass123!"}
        )
        # Should return 422 for validation error
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("✓ Invalid email format rejected correctly")
    
    def test_signup_short_password(self):
        """Test signup allows short password (no server-side validation beyond pydantic)"""
        # Note: Password length validation may only be on frontend
        # This test documents current backend behavior
        response = requests.post(
            f"{BASE_URL}/api/auth/signup",
            json={"email": f"TEST_short_{uuid.uuid4().hex[:8]}@example.com", "password": "123"}
        )
        # Backend may accept short passwords if no validation
        print(f"✓ Short password response: {response.status_code}")
    
    def test_login_missing_fields(self):
        """Test login with missing fields returns 422"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "test@example.com"}  # Missing password
        )
        assert response.status_code == 422
        print("✓ Missing password field rejected correctly")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
