interface CatProps {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Box = ({ catInfo }: { catInfo: CatProps }) => {
  const { id, url, width, height } = catInfo;
  return (
    <div>
      <img src={url} alt={`${id}`} width={500} height={450} />
    </div>
  );
};

export default Box;
