from enum import Enum


class Conditions(Enum):
    INVISIBLE = "invisible"
    STRENGTHEN = "strengthen"
    WOUND = "wound"
    POISON = "poison"
    IMMOBILIZE = "immobilize"
    DISARM = "disarm"
    MUDDLE = "muddle"
    PIERCE = "pierce"


class MoveTypes(Enum):
    MOVE = "move"
    JUMP = "jump"
    FLYING = "flying"


class ForcedMovementTypes(Enum):
    PUSH = "push"
    PULL = "pull"


class AttackTypes(Enum):
    MELEE = "melee"
    RANGE = "range"
    TARGET = "target"
    DAMAGE = "damage"


class EffectTypes(Enum):
    HEAL = "heal"
    SHIELD = "shield"
    RETALIATE = "retaliate"
