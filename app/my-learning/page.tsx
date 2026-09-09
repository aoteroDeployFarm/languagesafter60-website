import type { Metadata } from "next";
import { MyLearning } from "@/components/profile/my-learning";

export const metadata: Metadata = {
  title: "My Learning",
  description:
    "Continue where you left off, review the phrases you saved for practice, and choose what comes next. No account required — everything is stored in your own browser.",
};

/**
 * A server-rendered shell around a client workspace.
 *
 * Nothing here reads browser storage, so the statically exported HTML is the
 * same for everyone and hydration has nothing to disagree about. The component
 * below shows a loading state until it has actually read this browser's data.
 */
export default function MyLearningPage() {
  return <MyLearning />;
}
