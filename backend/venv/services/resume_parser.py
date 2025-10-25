import fitz  # PyMuPDF
from docx import Document
import re
from typing import Dict, Any

class ResumeParser:
    def parse_resume(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        file_extension = filename.split('.')[-1].lower()
        
        if file_extension == 'pdf':
            text = self._parse_pdf(file_content)
        elif file_extension == 'docx':
            text = self._parse_docx(file_content)
        else:
            raise ValueError(f"Unsupported file format: {file_extension}")
        
        sections = self._extract_sections(text)
        
        return {
            "raw_text": text,
            "sections": sections,
            "metadata": {
                "word_count": len(text.split()),
                "character_count": len(text),
                "file_type": file_extension
            }
        }
    
    def _parse_pdf(self, file_content: bytes) -> str:
        """Extract text from PDF using PyMuPDF"""
        try:
            doc = fitz.open(stream=file_content, filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            doc.close()
            return text.strip()
        except Exception as e:
            raise Exception(f"PDF parsing failed: {str(e)}")
    
    def _parse_docx(self, file_content: bytes) -> str:
        """Extract text from DOCX"""
        try:
            from io import BytesIO
            doc = Document(BytesIO(file_content))
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text.strip()
        except Exception as e:
            raise Exception(f"DOCX parsing failed: {str(e)}")
    
    def _extract_sections(self, text: str) -> Dict[str, str]:
        """Extract resume sections using regex patterns"""
        sections = {
            "contact": "",
            "summary": "",
            "experience": "",
            "education": "",
            "skills": "",
            "projects": "",
            "other": ""
        }
        
        # Common section headers patterns
        section_patterns = {
            "contact": r"(contact|personal|info|information|details)",
            "summary": r"(summary|objective|profile|about|statement)",
            "experience": r"(experience|work|employment|history|career)",
            "education": r"(education|academic|qualifications|school)",
            "skills": r"(skills|technical|competencies|abilities|expertise)",
            "projects": r"(projects|portfolio|work samples)"
        }
        
        lines = text.split('\n')
        current_section = "other"
        
        for line in lines:
            line_lower = line.strip().lower()
            
            # Check if this line is a section header
            for section, pattern in section_patterns.items():
                if re.search(pattern, line_lower) and len(line.strip()) < 100:
                    current_section = section
                    break
            else:
                # Add line to current section
                if line.strip():
                    sections[current_section] += line + "\n"
        
        # Clean up sections
        for key in sections:
            sections[key] = sections[key].strip()
        
        return sections