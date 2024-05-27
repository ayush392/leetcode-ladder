import questionModel from "@/database/config/models/question.model";
import connectToDb from "../database/config/connect";
import Filter from "@/components/Filter";
import TableHead from "@/components/TableHead";
import Checkbox from "@/components/Checkbox";
import Pagination from "@/components/Pagination";

/*
 const getQuery = (page: number) => {
    return `query mostRecentPastContest {
      pastContests(pageNo: ${page}, numPerPage: 1) {
        data {
          title
          titleSlug
          questions {
            title
            titleSlug
            questionId
            credit
          }
        }
      }
    }
  `;
  };

  async function savedataInDb(data: any) {
    await connectToDb();
    try {
      const { title, titleSlug, questions } = data;
      const contest = { title, titleSlug };
      questions.forEach(async (question: any) => {
        const { title, titleSlug, credit, questionId } = question;
        await questionModel.create({
          contest,
          title,
          titleSlug,
          credit,
          questionId,
        });
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  for (let i = 1; i <= 400; i++) {
    try {
      const query = getQuery(i);
      const dataT = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await dataT.json();
      console.log(data.data.pastContests.data, "data fetched");

      await savedataInDb(data.data.pastContests.data[0]);
    } catch (error: any) {
      console.log(error.message);
    }
  }
*/

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
    <section className=" max-w-6xl mx-auto">
      <Filter contest={contest} difficulty={difficulty} credit={credit} search={search} />
      <table className="w-full text-left text-gray-700 dark:text-gray-400">
        <TableHead />
        <tbody>
          {questions.map((question: any) => {
            return (
              <tr
                key={question._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
              >
                <td className="px-6 py-3">
                  <Checkbox />
                </td>
                <td className="px-6 py-3">
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
                      ? "text-teal-600"
                      : question.difficulty === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {question.difficulty || "N/A"}
                </td>
                <td className="px-6 py-3">
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
      </table>
      <Pagination totalQuestions = {totalQuestions} currentPage={page} limit={limit} />
    </section>
  );
}

export default Home;
