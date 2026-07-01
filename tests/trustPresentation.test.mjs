import assert from "node:assert/strict";
import test from "node:test";
import {
  canPublishBooking,
  canPublishTestimonials,
} from "../src/lib/trustPresentation.mjs";

const approved = { approvedForPublicUse: true };

test("testimonials remain hidden until feature, trust, and approved count are ready", () => {
  assert.equal(
    canPublishTestimonials({
      featureEnabled: false,
      trustReady: true,
      minimumCount: 3,
      testimonials: [approved, approved, approved],
    }),
    false,
  );
  assert.equal(
    canPublishTestimonials({
      featureEnabled: true,
      trustReady: true,
      minimumCount: 3,
      testimonials: [approved, approved, approved],
    }),
    true,
  );
});

test("booking remains hidden until the complete workflow and URL are ready", () => {
  assert.equal(
    canPublishBooking({
      featureEnabled: true,
      trustReady: true,
      workflowReady: false,
      bookingUrl: "https://example.com/booking",
    }),
    false,
  );
  assert.equal(
    canPublishBooking({
      featureEnabled: true,
      trustReady: true,
      workflowReady: true,
      bookingUrl: "https://example.com/booking",
    }),
    true,
  );
});
