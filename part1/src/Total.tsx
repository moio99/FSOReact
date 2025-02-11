interface iTotal {
  total: number;
}

const Total = ({total}: iTotal) => {
  return (
    <div>
      <p>Total: {total} parts</p>
    </div>
  );
};

export default Total