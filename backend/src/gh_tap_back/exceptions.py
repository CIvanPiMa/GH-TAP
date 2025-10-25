class GHTAPError(Exception):
    """Base exception class for GH-TAP errors."""

    pass


class NotFoundError(GHTAPError):
    """Exception raised when a requested resource is not found."""

    pass
