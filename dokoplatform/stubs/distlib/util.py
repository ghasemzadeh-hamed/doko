"""Subset of :mod:`distlib.util` providing :class:`cached_property`."""


class cached_property:  # noqa: N801 - mimic original name
    """A simple cached property implementation.

    The descriptor caches the computed value on the instance dictionary the
    first time it is accessed, mirroring the behaviour of
    :func:`functools.cached_property` that is bundled with newer Python
    versions.
    """

    def __init__(self, func):
        self.func = func
        self.__doc__ = getattr(func, "__doc__")

    def __get__(self, instance, owner=None):
        if instance is None:
            return self
        name = self.func.__name__
        if name not in instance.__dict__:
            instance.__dict__[name] = self.func(instance)
        return instance.__dict__[name]
