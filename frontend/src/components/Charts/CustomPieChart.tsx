import { PieChart } from "@mui/x-charts";

const difficultyLevels: any = {
    easy: "#2E96FF",
    medium: "#02B2AF",
    hard: "#B800D8",
};
const tagTypes: any = {
    Work: "#2E96FF",
    Personal: "#02B2AF",
    Study: "#B800D8",
    Other: "tomato",
};

type Props = {
    prepareChartData: () => { id: string; value: number }[];
    type: string;
};

export default function CustomPieChart({ prepareChartData, type }: Props) {
    return (
        <>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-12 sm:col-span-7 w-full h-72">
                    <PieChart
                        series={[
                            {
                                data: prepareChartData(),
                                highlightScope: {
                                    faded: "global",
                                    highlighted: "item",
                                },
                                faded: {
                                    innerRadius: 30,
                                    additionalRadius: -30,
                                    color: "gray",
                                },
                            },
                        ]}
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <div className="col-span-12 sm:col-span-3">
                    <h2 className="text-xl font-semibold pb-4 text-center">
                        {type === "todoList"
                            ? "Difficulty level of new tasks"
                            : "Tag types of new tasks"}{" "}
                    </h2>
                    <ul className="list-none flex flex-col gap-2 font-semibold">
                        {type === "todoList"
                            ? Object.keys(difficultyLevels).map(
                                  (difficulty) => (
                                      <li
                                          className="flex gap-2"
                                          key={difficulty}
                                      >
                                          <div
                                              className="bg-[#2E96FF] opacity-1 w-5 h-5"
                                              style={{
                                                  backgroundColor:
                                                      difficultyLevels[
                                                          difficulty
                                                      ],
                                              }}
                                          ></div>
                                          <p>{difficulty}</p>
                                      </li>
                                  )
                              )
                            : Object.keys(tagTypes).map((tag) => (
                                  <li className="flex gap-2" key={tag}>
                                      <div
                                          className="bg-[#2E96FF] opacity-1 w-5 h-5"
                                          style={{
                                              backgroundColor: tagTypes[tag],
                                          }}
                                      ></div>
                                      <p>{tag}</p>
                                  </li>
                              ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
