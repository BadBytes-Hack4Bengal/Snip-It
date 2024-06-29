import { random, sampleSize } from "lodash";

interface ISnippet {
  code: string;
  author: string;
  lang: string;
  title: string;
  description: string;
  tags: string[];
  score: number;
}

const makeTestSnippet = () => {
  const code = `
#include <iostream>

void greet(std::string name) {
  std::cout << "Hello, "
            << name
            << "!"
            << std::endl;
}

int main() {
  greet("Dipannita");
  return 0;
}
`;

  const title = "An Example Gist";
  const description =
    "An example description. An example description. An example description. An example description. An example description. An example description. ";
  const tags = [
    "node",
    "mongo",
    "javascript",
    "monitor",
    "ruby",
    "python",
    "java",
    "cooler",
    "c#",
    "h4b",
    "charger",
    "fan",
    "laptop",
    "keyboard",
    "c++",
    "api",
    "react",
    "tailwind",
    "watch"
  ];
  const snippetData: ISnippet = {
    code,
    title,
    author: "ArneshRC",
    description: description,
    lang: "cpp",
    score: random(1, 10),
    tags: sampleSize(tags, 4)
  };

  return snippetData;
};

const fetchSnippets: () => Promise<ISnippet[]> = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return Array(20)
    .fill(makeTestSnippet)
    .map(f => f());
};

export { type ISnippet, fetchSnippets };
