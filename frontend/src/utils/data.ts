import { SNIPPETS_BASE_URL } from "@src/constants";
import { random, sampleSize } from "lodash";

interface ISnippet {
  code: string;
  author: {
    username: string;
    profilePicUrl?: string;
  };
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

const fetchSnippets: (page: number) => Promise<ISnippet[]> = async () => {
  console.log("hi");
  const res = await fetch(SNIPPETS_BASE_URL, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      page: 1
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data.data;
};

export { type ISnippet, fetchSnippets };
