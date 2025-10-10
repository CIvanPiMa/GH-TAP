"""
A small `dog` class example.
"""
from typing import List, Optional


FAVORITE_FOOD = "🍖"
"""The favorite food of all dogs."""


class Dog:
    """
    A class representing a dog. 🐕!!!
    
    Attributes
    ----------
    name : str
        The name of our dog.
    friends : list[str]
        The friends of our dog.
    
    Methods
    -------
    bark(loud: bool = True) -> str
        *woof*
    """

    name: str
    """The name of our dog."""
    
    friends: list[str]
    """The friends of our dog."""

    def __init__(self, name: str, friends: Optional[List[str]] = None) -> None:
        """
        Make a Dog.
        
        Parameters
        ----------
        name : str
            The name of our dog.
        friends : list[str], optional
            The friends of our dog.
        """
        self.name = name
        self.friends = friends or []

    def bark(self, loud: bool = True) -> str:
        """
        \\*woof\\*
        
        Parameters
        ----------
        loud : bool, optional
            Whether to bark loudly or not.
        
        Returns
        -------
        String representing the bark to each friend.
        """
        sound = "*woof* " + " *woof* ".join(self.friends)
        return f"{sound.upper()}!!!" if loud else sound
