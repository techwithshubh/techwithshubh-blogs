type Props = {
  tags: string;
};

export const Tags = ({ tags }: Props) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 mb-4">
      {tags.split(",").map((tag: string) => {
        return <p className="bg-black text-pastal-green px-4 py-2 rounded" key="tag">{tag}</p>;
      })}
    </div>
  );
};
