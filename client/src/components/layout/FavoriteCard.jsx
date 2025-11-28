export default function FavoriteCard({ fav }) {
  const design = fav.SocksDesign;

  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      <div
        className="w-full h-40 rounded-lg mb-3"
        style={{ backgroundColor: design.Color.hex }}
      ></div>

      <div className="flex justify-between items-center">
        <p className="font-medium">{design.Pattern.title}</p>
        <img src={design.Image.url} alt="" className="w-10 h-10" />
      </div>
    </div>
  );
}
