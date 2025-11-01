from decimal import Decimal


def compute_taxes(base: Decimal, tax_rate_percent: float) -> Decimal:
    return (base * Decimal(str(tax_rate_percent))) / Decimal("100.0")
