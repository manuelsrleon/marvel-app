import "./FavButton.css";
type FavButtonProps = {
  id?: string;
  toggled: boolean;
  size?: "small";
  invert?: boolean;
};
export function FavButton({
  id,
  toggled,
  size,
  invert,
}: Readonly<FavButtonProps>) {
  //This is not optimal
  return (
    <img
      id={id}
      src={
        toggled ? "/assets/heart-icon.svg" : "/assets/heart-icon-outline.svg"
      }
      alt={toggled ? "activated favourite icon" : "deactivated favourite icon"}
      className={
        "heart-icon" +
        (invert ? " invert" : " no-invert") +
        (size == "small" ? " heart-icon-small" : "")
      }
    />
  );
}
