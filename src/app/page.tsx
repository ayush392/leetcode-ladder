import questionModel from "@/database/config/models/question.model";
import connectToDb from "../database/config/connect";
import Filter from "@/components/Filter";
import TableHead from "@/components/TableHead";
import Checkbox from "@/components/Checkbox";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

async function Home({ searchParams }: any) {
  await connectToDb();
  let { sort, contest, difficulty, credit, search, page, limit } = searchParams;
  if (!page || isNaN(parseInt(page))) page = 1;
  if (!limit || isNaN(parseInt(limit))) limit = 20;

  let query = {};
  let sortQuery = {};

  if (search) {
    query = { ...query, title: { $regex: search, $options: "i" } };
  }

  if (contest) {
    query = { ...query, "contest.type": contest };
  }
  if (difficulty) {
    query = { ...query, difficulty: difficulty };
  }
  if (credit) {
    query = { ...query, credit: parseInt(credit) };
  }

  if (sort) {
    let [key, value] = sort.split(":");
    sortQuery = { [key]: value === "asc" ? 1 : -1 };
  }

  const res = await questionModel
    .find(query)
    .sort(sortQuery)
    .skip((page - 1) * limit)
    .limit(limit);
  const totalQuestions = await questionModel.countDocuments(query);
  const questions = await JSON.parse(JSON.stringify(res));
  // <a href={`https://leetcode.com/problems/${question.titleSlug}`} target="_blank" rel="noreferrer">

  return (
    <main className="text-sm text-gray-700 dark:text-neutral-100 md:text-base">
      <header className="border-b shadow-sm dark:border-neutral-500">
        <div className="flex items-center justify-between max-w-6xl py-4 mx-auto">
          <h1 className="text-2xl font-bold">Leetcode Archive</h1>
          <ThemeSwitcher />
        </div>
      </header>
      <section className="max-w-6xl mx-auto ">
        <Filter
          contest={contest}
          difficulty={difficulty}
          credit={credit}
          search={search}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <table className="w-full text-left">
            <TableHead />
            {questions.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-3 font-medium text-center h-36 text-neutral-400"
                  >
                    No Questions Found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {questions.map((question: any) => {
                  return (
                    <tr
                      key={question._id}
                      className="odd:bg-white odd:dark:bg-neutral-900 even:bg-gray-50 even:dark:bg-neutral-800"
                    >
                      <td className="px-6 py-3">
                        <Checkbox questionId={question.questionId} />
                      </td>
                      <td className="px-6 py-3 overflow-clip">
                        <a
                          href={`https://leetcode.com/problems/${question.titleSlug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-blue-500 "
                        >
                          {question.title}
                        </a>
                      </td>
                      <td className="px-6 py-3">{question.credit}</td>
                      <td
                        className={`px-6 py-3 ${
                          question.difficulty === "Easy"
                            ? "text-green-500"
                            : question.difficulty === "Medium"
                            ? "text-amber-500"
                            : "text-red-500"
                        }`}
                      >
                        {question.difficulty || "N/A"}
                      </td>
                      <td className="hidden px-6 py-3 whitespace-nowrap md:block">
                        <a
                          href={`https://leetcode.com/contest/${question.contest.titleSlug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-blue-500 "
                        >
                          {question.contest.title}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </Suspense>
        <Pagination
          totalQuestions={totalQuestions}
          currentPage={page}
          limit={limit}
        />
      </section>
    </main>
  );
}

export default Home;
