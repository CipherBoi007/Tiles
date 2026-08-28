# Vitest / Jest Unit Testing Execution Report

## Execution Summary
- **Test Runner**: Jest v30 + ts-jest (Node.js runtime)
- **Execution Timestamp**: 2026-08-28T09:11:25Z
- **Script Location**: `test/vitest/Scripts/unit.test.ts`
- **Result Status**: **PASSED (100% Pass Rate)**

## Metrics
- **Test Suites Discovered**: 1
- **Test Suites Passed**: 1
- **Total Tests Executed**: 9
- **Passed Tests**: 9
- **Failed Tests**: 0
- **Skipped Tests**: 0
- **Execution Duration**: 2.65 seconds

---

## Detailed Test Case Execution Breakdown

| Suite | Test Case | Status | Duration |
| :--- | :--- | :---: | :---: |
| **Category Schema** | Validate valid category payload | `PASSED` | 3 ms |
| **Category Schema** | Reject category payload missing required name | `PASSED` | 1 ms |
| **Category Schema** | Reject empty string for category name | `PASSED` | 1 ms |
| **SubCategory Schema** | Validate valid subcategory payload | `PASSED` | 1 ms |
| **SubCategory Schema** | Reject subcategory without categoryId | `PASSED` | 1 ms |
| **Tile Product Schema** | Validate valid tile product payload | `PASSED` | 1 ms |
| **Tile Product Schema** | Fail when tile name is missing or empty | `PASSED` | 1 ms |
| **Enquiry Schema** | Validate valid customer enquiry | `PASSED` | 1 ms |
| **Enquiry Schema** | Reject enquiry with short customer name | `PASSED` | 1 ms |

---

## Raw Execution Logs
Saved at: `test/reports/raw/vitest_raw.json`
