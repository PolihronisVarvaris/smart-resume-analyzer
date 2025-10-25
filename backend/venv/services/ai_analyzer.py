import re
from typing import Dict, List, Any

class AIAnalyzer:
    def __init__(self):
        # Remove LanguageTool for now to avoid download issues
        pass
    
    def analyze_resume(self, parsed_data: Dict[str, Any]) -> Dict[str, Any]:
        text = parsed_data["raw_text"]
        sections = parsed_data["sections"]
        
        # Run all analyses (without grammar checking for now)
        grammar_analysis = self._analyze_grammar(text)
        keyword_analysis = self._extract_keywords(text)
        formatting_score = self._assess_formatting(sections)
        content_score = self._assess_content(text, sections)
        
        # Calculate overall score
        overall_score = self._calculate_overall_score(
            grammar_analysis["score"],
            formatting_score,
            content_score
        )
        
        return {
            "overall_score": overall_score,
            "grammar_analysis": grammar_analysis,
            "keyword_analysis": keyword_analysis,
            "formatting_analysis": {
                "score": formatting_score,
                "issues": self._identify_formatting_issues(sections)
            },
            "suggestions": self._generate_suggestions(text, sections, grammar_analysis, formatting_score)
        }
    
    def _analyze_grammar(self, text: str) -> Dict[str, Any]:
        """Basic grammar analysis without external dependencies"""
        # Simple grammar check using basic patterns
        common_errors = [
            (r'\bi\s', 'Lowercase "i" should be "I"'),
            (r'\btheir\s', 'Check "their/there/they\'re"'),
            (r'\byour\s', 'Check "your/you\'re"'),
        ]
        
        issues = []
        for pattern, message in common_errors:
            if re.search(pattern, text.lower()):
                issues.append({"message": message, "context": "Check spelling"})
        
        # Basic score based on text quality indicators
        word_count = len(text.split())
        has_capitalization = bool(re.search(r'[A-Z]', text))
        has_punctuation = bool(re.search(r'[.!?]', text))
        
        score = 85  # Base score
        if not has_capitalization:
            score -= 10
        if not has_punctuation:
            score -= 10
        if word_count < 50:
            score -= 5
            
        return {
            "score": max(60, score),  # Minimum 60 for basic resumes
            "issues": issues[:5],
            "total_issues": len(issues)
        }
    
    def _extract_keywords(self, text: str) -> Dict[str, List[str]]:
        """Extract skills and technologies"""
        # Common tech skills
        tech_keywords = {
            'python', 'javascript', 'java', 'c++', 'react', 'node.js', 'sql',
            'aws', 'docker', 'kubernetes', 'machine learning', 'ai',
            'fastapi', 'flask', 'django', 'vue', 'angular', 'typescript',
            'html', 'css', 'git', 'github', 'mongodb', 'postgresql', 'mysql',
            'linux', 'windows', 'agile', 'scrum'
        }
        
        # Soft skills
        soft_skills = {
            'leadership', 'communication', 'teamwork', 'problem solving',
            'critical thinking', 'adaptability', 'creativity', 'time management',
            'collaboration', 'analytical', 'strategic', 'innovative'
        }
        
        # Action verbs (good to have)
        action_verbs = {
            'developed', 'managed', 'led', 'created', 'implemented', 'designed',
            'improved', 'increased', 'reduced', 'optimized', 'built', 'launched'
        }
        
        text_lower = text.lower()
        words = set(text_lower.split())
        
        found_tech = list(tech_keywords.intersection(words))[:15]
        found_soft = list(soft_skills.intersection(words))[:10]
        found_actions = list(action_verbs.intersection(words))
        
        # Missing important keywords (suggestions)
        missing_tech = []
        if not found_tech:
            missing_tech = ['python', 'javascript', 'sql']
        
        missing_actions = []
        if not found_actions:
            missing_actions = ['achieved', 'improved', 'managed']
        
        return {
            "technical_skills": found_tech,
            "soft_skills": found_soft,
            "action_verbs": found_actions,
            "missing_keywords": missing_tech + missing_actions
        }
    
    def _assess_formatting(self, sections: Dict[str, str]) -> int:
        """Assess resume formatting"""
        score = 100
        
        # Check for essential sections
        essential_sections = ['experience', 'education', 'skills']
        for section in essential_sections:
            if not sections.get(section):
                score -= 20
        
        # Check section content length
        for section, content in sections.items():
            word_count = len(content.split())
            if section == "experience" and word_count < 10:
                score -= 10
            if section == "skills" and word_count < 5:
                score -= 5
        
        return max(0, score)
    
    def _assess_content(self, text: str, sections: Dict[str, str]) -> int:
        """Assess content quality"""
        score = 100
        
        # Check for quantifiable achievements
        quantifiable_patterns = [
            r'\d+%', r'\$\d+', r'\d+\+', r'increased by', r'reduced by',
            r'saved \$\d+', r'improved by \d+'
        ]
        
        has_quantifiable = any(re.search(pattern, text.lower()) for pattern in quantifiable_patterns)
        if not has_quantifiable:
            score -= 15
        
        # Check length
        word_count = len(text.split())
        if word_count < 100:
            score -= 10
        elif word_count > 1000:
            score -= 10
        
        # Check for contact info
        if not any(key in sections for key in ['contact', 'personal']):
            if not re.search(r'@\w+\.\w+', text):  # No email found
                score -= 5
        
        return score
    
    def _identify_formatting_issues(self, sections: Dict[str, str]) -> List[str]:
        """Identify formatting issues"""
        issues = []
        
        if not sections.get('experience'):
            issues.append("Missing experience section")
        if not sections.get('education'):
            issues.append("Missing education section")
        if not sections.get('skills'):
            issues.append("Missing skills section")
        
        total_words = sum(len(content.split()) for content in sections.values())
        if total_words < 150:
            issues.append("Resume might be too short - add more details")
        elif total_words > 800:
            issues.append("Resume might be too long - consider shortening")
        
        return issues
    
    def _generate_suggestions(self, text: str, sections: Dict[str, str], 
                            grammar_analysis: Dict, formatting_score: int) -> List[str]:
        """Generate improvement suggestions"""
        suggestions = []
        
        # Grammar suggestions
        if grammar_analysis["score"] < 80:
            suggestions.append("Review grammar and spelling")
        
        # Content suggestions
        if not any(word in text.lower() for word in ['achieved', 'improved', 'increased', 'reduced']):
            suggestions.append("Add quantifiable achievements with numbers")
        
        if len(sections.get('skills', '').split(',')) < 3:
            suggestions.append("Expand your skills section with more technologies")
        
        if formatting_score < 70:
            suggestions.append("Improve resume structure and formatting")
        
        if len(text.split()) < 200:
            suggestions.append("Add more detailed descriptions of your experience")
        
        # Ensure we always have some suggestions
        if not suggestions:
            suggestions = [
                "Consider adding a professional summary",
                "Include relevant certifications if any",
                "Add links to your portfolio or GitHub"
            ]
        
        return suggestions[:5]
    
    def _calculate_overall_score(self, grammar_score: int, formatting_score: int, content_score: int) -> int:
        """Calculate weighted overall score"""
        return int((grammar_score * 0.3) + (formatting_score * 0.4) + (content_score * 0.3))