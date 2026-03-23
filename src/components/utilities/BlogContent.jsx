import he from "he"; // decode escaped HTML
import parse, { domToReact } from "html-react-parser";
import Pera from "./Pera";
import Heading from "./Heading";

export const BlogContent = ({ html }) => {
  const decodedHtml = he.decode(html || ""); // safely decode in case it's escaped

  const options = {
    replace: (domNode) => {
      if (domNode.type === "text") return domNode.data;

      if (domNode.type === "tag") {
        const children = domToReact(domNode.children, options);

        if (domNode.name === "p") {
          return <Pera className="!text-justify">{children}</Pera>;
        }

        if (["h1", "h2"].includes(domNode.name)) {
          return (
            <Heading className="!text-left md:!text-[18px] my-[20px]">
              {children}
            </Heading>
          );
        }

        return <Pera className="!text-justify">{children}</Pera>;
      }

      return null;
    },
  };

  return <div>{parse(decodedHtml, options)}</div>;
};
