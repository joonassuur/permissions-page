interface Props {
  title: string;
}
function MainHeader2({ title }: Props) {
  return (
    <h2 className="self-center text-xl whitespace-nowrap text-primary">
      {title}
    </h2>
  );
}

export default MainHeader2;
