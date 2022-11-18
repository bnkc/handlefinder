from .result import QueryStatus
from concurrent.futures import ThreadPoolExecutor, as_completed
import asyncio


class QueryNotifyPrint:
    """Query Notify Print Object.

    Query notify class that prints results.
    """

    def __init__(self, result=None, verbose=False, print_all=False):
        """Create Query Notify Print Object."""
        self.verbose = verbose
        self.print_all = print_all

        return

    def update(self, result):
        """Notify Update."""
        if result.status == QueryStatus.CLAIMED:
            return result.site_name
