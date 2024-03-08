import "./LoaderBar.css";

interface LoaderBarType {
  completed: boolean;
}
export const LoaderBar = ({ completed }: LoaderBarType) => {
  return (
    <div
      data-testid="loader-bar"
      className={"loader-bar" + (completed ? " completed" : "")}
    >
      <div className="loader-bar-progress"></div>
    </div>
  );
};

export default LoaderBar;
