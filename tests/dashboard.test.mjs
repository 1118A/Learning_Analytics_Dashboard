import test from "node:test";
import assert from "node:assert/strict";

// Dataset definitions matching dashboard
const STUDENT_COUNT = 32593;
const ORIGINAL_STUDENT_COUNT = 32953;
const ROWS_REMOVED = 360;

const FINAL_RESULTS = {
  distinction: 3024,
  pass: 12361,
  withdrawn: 10156,
  fail: 7052,
};

const MODULE_DATA = {
  AAA: { enrolled: 748, distinction: 84, pass: 442, withdrawn: 182, fail: 40, withdrawalRate: 24.3 },
  BBB: { enrolled: 7909, distinction: 892, pass: 3811, withdrawn: 1935, fail: 1271, withdrawalRate: 24.5 },
  CCC: { enrolled: 4434, distinction: 499, pass: 1976, withdrawn: 1192, fail: 767, withdrawalRate: 26.9 },
  DDD: { enrolled: 6272, distinction: 692, pass: 2692, withdrawn: 1821, fail: 1067, withdrawalRate: 29.0 },
  EEE: { enrolled: 2934, distinction: 315, pass: 1224, withdrawn: 800, fail: 595, withdrawalRate: 27.3 },
  FFF: { enrolled: 7762, distinction: 837, pass: 3276, withdrawn: 2182, fail: 1467, withdrawalRate: 28.1 },
  GGG: { enrolled: 2534, distinction: 206, pass: 1044, withdrawn: 1064, fail: 220, withdrawalRate: 42.0 },
};

const PRESENTATIONS_DATA = [
  { code: "2013B", enrolled: 6839, completed: 3317, withdrawn: 2108, completionRate: 48.5 },
  { code: "2013J", enrolled: 8859, completed: 4216, withdrawn: 2755, completionRate: 47.6 },
  { code: "2014B", enrolled: 7804, completed: 3675, withdrawn: 2474, completionRate: 47.1 },
  { code: "2014J", enrolled: 9091, completed: 4177, withdrawn: 2819, completionRate: 45.9 },
];

const THREE_RECOMMENDATIONS = [
  { id: 1, title: "Early-warning at Week 2", additionalCompletions: 1500 },
  { id: 2, title: "Module redesign for GGG & EEE", additionalCompletions: 450 },
  { id: 3, title: "Targeted support for deprived/non-traditional students", additionalCompletions: 300 },
];

const IMD_DECILES = [
  { label: "0-10%", rate: 39.4 },
  { label: "90-100%", rate: 55.2 },
];

const REGIONS = [
  { region: "Scotland", enrolled: 3446, withdrawalRate: 26.3 },
  { region: "East Anglian Region", enrolled: 3340, withdrawalRate: 30.1 },
  { region: "London Region", enrolled: 3216, withdrawalRate: 34.5 },
  { region: "South Region", enrolled: 3092, withdrawalRate: 30.0 },
  { region: "North Western Region", enrolled: 2906, withdrawalRate: 35.6 },
  { region: "West Midlands Region", enrolled: 2582, withdrawalRate: 35.4 },
  { region: "South West Region", enrolled: 2436, withdrawalRate: 31.1 },
  { region: "East Midlands Region", enrolled: 2365, withdrawalRate: 34.8 },
  { region: "South East Region", enrolled: 2111, withdrawalRate: 30.7 },
  { region: "Wales", enrolled: 2086, withdrawalRate: 25.1 },
  { region: "Yorkshire Region", enrolled: 2006, withdrawalRate: 32.8 },
  { region: "North Region", enrolled: 1823, withdrawalRate: 31.5 },
  { region: "Ireland", enrolled: 1184, withdrawalRate: 23.1 },
];

test("OULAD dataset integrity: total student count matches final results", () => {
  const sumResults =
    FINAL_RESULTS.distinction +
    FINAL_RESULTS.pass +
    FINAL_RESULTS.withdrawn +
    FINAL_RESULTS.fail;

  assert.equal(sumResults, STUDENT_COUNT, "Sum of all outcomes must equal total students");
  assert.equal(STUDENT_COUNT, 32593, "Dataset should have exactly 32,593 records");
});

test("FR-1 Data Cleaning: original rows minus removed equals analysis dataset", () => {
  assert.equal(ORIGINAL_STUDENT_COUNT - ROWS_REMOVED, STUDENT_COUNT, "32,953 - 360 must equal 32,593");
});

test("OULAD completion and withdrawal rate calculations", () => {
  const completionRate = parseFloat(
    (((FINAL_RESULTS.distinction + FINAL_RESULTS.pass) / STUDENT_COUNT) * 100).toFixed(1)
  );
  assert.equal(completionRate, 47.2, "Completion rate should be 47.2%");

  const withdrawalRate = parseFloat(
    ((FINAL_RESULTS.withdrawn / STUDENT_COUNT) * 100).toFixed(1)
  );
  assert.equal(withdrawalRate, 31.2, "Withdrawal rate should be 31.2%");
});

test("Module data integrity across all 7 modules", () => {
  const moduleCodes = Object.keys(MODULE_DATA);
  assert.equal(moduleCodes.length, 7, "Must contain exactly 7 modules (AAA-GGG)");

  let totalEnrolled = 0;
  for (const [code, m] of Object.entries(MODULE_DATA)) {
    const outcomeSum = m.distinction + m.pass + m.withdrawn + m.fail;
    assert.equal(
      outcomeSum,
      m.enrolled,
      `Module ${code}: sum of outcomes (${outcomeSum}) must equal enrolled (${m.enrolled})`
    );
    totalEnrolled += m.enrolled;

    const calcWithdrawalRate = parseFloat(((m.withdrawn / m.enrolled) * 100).toFixed(1));
    assert.equal(
      calcWithdrawalRate,
      m.withdrawalRate,
      `Module ${code}: withdrawal rate mismatch`
    );
  }

  assert.equal(
    totalEnrolled,
    STUDENT_COUNT,
    "Sum of enrolled students across all modules must equal 32,593"
  );
});

test("Presentations cohort sum matches total dataset", () => {
  const totalInPresentations = PRESENTATIONS_DATA.reduce((acc, p) => acc + p.enrolled, 0);
  assert.equal(
    totalInPresentations,
    STUDENT_COUNT,
    "Sum of all presentation cohorts must equal total students (32,593)"
  );
});

test("FR-7 Three Recommendations: exactly three and impact sums to 2,250", () => {
  assert.equal(THREE_RECOMMENDATIONS.length, 3, "Must have exactly 3 recommendations");
  const totalImpact = THREE_RECOMMENDATIONS.reduce((sum, r) => sum + r.additionalCompletions, 0);
  assert.equal(totalImpact, 2250, "Combined impact must equal ~2,250 additional completions");
  
  const percentageUplift = parseFloat(((totalImpact / STUDENT_COUNT) * 100).toFixed(1));
  assert.ok(percentageUplift >= 6.8 && percentageUplift <= 7.2, "Impact represents ~7% completion improvement");
});

test("IMD Deprivation Gap: 15.8 percentage points gap between most and least deprived", () => {
  const mostDeprived = IMD_DECILES.find((d) => d.label === "0-10%");
  const leastDeprived = IMD_DECILES.find((d) => d.label === "90-100%");
  const gap = parseFloat((leastDeprived.rate - mostDeprived.rate).toFixed(1));
  assert.equal(gap, 15.8, "IMD achievement gap must be exactly 15.8 percentage points");
});

test("UK Regional Map structure integrity: 13 regions sum to 32,593", () => {
  assert.equal(REGIONS.length, 13, "Must have exactly 13 UK regions");
  const totalInRegions = REGIONS.reduce((sum, r) => sum + r.enrolled, 0);
  assert.equal(totalInRegions, STUDENT_COUNT, "Regional enrollments must sum to total students (32,593)");
  
  const minRate = Math.min(...REGIONS.map((r) => r.withdrawalRate));
  const maxRate = Math.max(...REGIONS.map((r) => r.withdrawalRate));
  assert.equal(minRate, 23.1, "Lowest regional withdrawal rate should be Ireland at 23.1%");
  assert.equal(maxRate, 35.6, "Highest regional withdrawal rate should be North Western at 35.6%");
});

test("What-If simulation logic handles valid bounds", () => {
  const baseStudents = STUDENT_COUNT;
  const baseRate = 47.2;

  // At 0% what-if
  const sim0 = {
    additional: Math.round(baseStudents * (0 / 100) * 0.42),
    rate: Math.min(baseRate + 0 * 0.42, 100),
  };
  assert.equal(sim0.additional, 0);
  assert.equal(sim0.rate, 47.2);

  // At 10% what-if
  const sim10 = {
    additional: Math.round(baseStudents * (10 / 100) * 0.42),
    rate: parseFloat(Math.min(baseRate + 10 * 0.42, 100).toFixed(1)),
  };
  assert.equal(sim10.additional, 1369);
  assert.equal(sim10.rate, 51.4);
  assert.ok(sim10.rate > baseRate, "Simulated rate should improve");
});
