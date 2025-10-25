from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import uuid

# Import our real analysis services
from services.resume_parser import ResumeParser
from services.ai_analyzer import AIAnalyzer

app = FastAPI(
    title="Smart Resume Analyzer API",
    description="AI-powered resume analysis and feedback system",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize analysis services
resume_parser = ResumeParser()
ai_analyzer = AIAnalyzer()

@app.get("/")
async def root():
    return {"message": "Smart Resume Analyzer API", "status": "healthy"}

@app.post("/api/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    try:
        print(f"📨 Received file upload: {file.filename}")
        
        # Validate file type
        if not (file.filename and (file.filename.lower().endswith('.pdf') or file.filename.lower().endswith('.docx'))):
            raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX are allowed.")
        
        # Read file content
        file_content = await file.read()
        print(f"📄 File size: {len(file_content)} bytes")
        
        # REAL ANALYSIS - Parse the resume
        parsed_data = resume_parser.parse_resume(file_content, file.filename)
        print(f"📊 Parsed resume: {parsed_data['metadata']['word_count']} words")
        
        # REAL ANALYSIS - Analyze with AI
        analysis_results = ai_analyzer.analyze_resume(parsed_data)
        print(f"✅ Analysis complete: {analysis_results['overall_score']}/100")
        
        return JSONResponse(content={
            "success": True,
            "data": analysis_results,
            "file_type": file.filename.split('.')[-1].lower(),
            "word_count": parsed_data['metadata']['word_count']
        })
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "resume-analyzer"}