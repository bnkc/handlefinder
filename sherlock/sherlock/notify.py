from result import QueryStatus


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
            print({"site": result.site_name, "url": result.site_url_user})

        return
