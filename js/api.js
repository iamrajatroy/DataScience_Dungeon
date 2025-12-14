// ========================================
// DATA SCIENCE DUNGEON - API SERVICE
// ========================================

const API_BASE_URL = `http://${window.location.hostname}:8080/api`;
const API_HEALTH_URL = `http://${window.location.hostname}:8080/health`;

class ApiService {
    constructor() {
        this.token = localStorage.getItem('auth_token');
    }

    // ==================== AUTH HELPERS ====================

    setToken(token) {
        this.token = token;
        localStorage.setItem('auth_token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    isAuthenticated() {
        return !!this.token;
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || `HTTP error ${response.status}`);
        }
        return response.json();
    }

    // Helper: fetch with timeout to prevent hanging
    async fetchWithTimeout(resource, options = {}) {
        const { timeout = 3000 } = options;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(resource, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    }

    // ==================== USER ENDPOINTS ====================

    async register(username, email, password) {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await this.handleResponse(response);
        this.setToken(data.access_token);
        return data;
    }

    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await this.handleResponse(response);
        this.setToken(data.access_token);
        return data;
    }

    async getProfile() {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: this.getHeaders(),
        });
        return this.handleResponse(response);
    }

    async checkAuth() {
        if (!this.token) return null;
        try {
            const response = await fetch(`${API_BASE_URL}/users/check`, {
                headers: this.getHeaders(),
            });
            return this.handleResponse(response);
        } catch {
            this.clearToken();
            return null;
        }
    }

    logout() {
        this.clearToken();
    }

    // ==================== PROGRESS ENDPOINTS ====================

    async getProgress() {
        const response = await this.fetchWithTimeout(`${API_BASE_URL}/progress`, {
            headers: this.getHeaders(),
            timeout: 2000 // 2s timeout for initial load
        });
        return this.handleResponse(response);
    }

    async createProgress(progressData = {}) {
        const response = await this.fetchWithTimeout(`${API_BASE_URL}/progress`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(progressData),
            timeout: 2000 // 2s timeout
        });
        return this.handleResponse(response);
    }

    async updateProgress(progressData) {
        const response = await this.fetchWithTimeout(`${API_BASE_URL}/progress`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(progressData),
            timeout: 2000 // 2s timeout
        });
        return this.handleResponse(response);
    }

    async deleteProgress() {
        const response = await fetch(`${API_BASE_URL}/progress`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return this.handleResponse(response);
    }

    // ==================== QUESTION ENDPOINTS ====================

    async getQuestionByRoomChest(room, chest) {
        const response = await fetch(
            `${API_BASE_URL}/questions/by-room-chest?room=${room}&chest=${chest}`,
            { headers: this.getHeaders() }
        );
        return this.handleResponse(response);
    }

    async getRandomQuestion(difficulty, excludeIds = []) {
        let url = `${API_BASE_URL}/questions/random?difficulty=${difficulty}`;
        if (excludeIds.length > 0) {
            url += `&exclude_ids=${excludeIds.join(',')}`;
        }
        const response = await fetch(url, { headers: this.getHeaders() });
        return this.handleResponse(response);
    }

    async markQuestionAnswered(questionId, answeredCorrectly, roomNumber = null) {
        const body = {
            question_id: questionId,
            answered_correctly: answeredCorrectly,
        };
        if (roomNumber !== null) {
            body.room_number = roomNumber;
        }
        const response = await fetch(`${API_BASE_URL}/questions/answered`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        return this.handleResponse(response);
    }

    async getAnsweredQuestions() {
        const response = await fetch(`${API_BASE_URL}/questions/answered`, {
            headers: this.getHeaders(),
        });
        return this.handleResponse(response);
    }

    async getQuestionStats() {
        const response = await fetch(`${API_BASE_URL}/questions/stats`, {
            headers: this.getHeaders(),
        });
        return this.handleResponse(response);
    }

    // ==================== LEADERBOARD ENDPOINTS ====================

    async getLeaderboard() {
        const response = await fetch(`${API_BASE_URL}/leaderboard`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return this.handleResponse(response);
    }

    // ==================== HEALTH CHECK ====================

    async healthCheck() {
        try {
            const response = await this.fetchWithTimeout(API_HEALTH_URL, {
                timeout: 2000 // 2s timeout for health check
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Global API service instance
window.api = new ApiService();
