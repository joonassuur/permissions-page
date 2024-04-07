interface Props {
  title: string;
}
function MainHeader1({ title }: Props) {
  return (
    <h1 className="self-center text-2xl whitespace-nowrap text-primary">
      {title}
    </h1>
  );
}

export default MainHeader1;
