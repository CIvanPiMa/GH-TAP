from fastapi import APIRouter

router = APIRouter(
    prefix="",
    tags=["root"],
)


@router.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to GloomHeaven Turn Assistant API, for more info visit /api/v1/docs",
        "version": "1.0.0",
    }


@router.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
