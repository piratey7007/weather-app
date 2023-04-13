import Cloud from "../Cloud";
import Lightning from "../Lightning";
import Orb from "../Orb";
import Rain from "../Rain";
import Snow from "../Snow";
const Snowy = () => {
  return (
    <div className="absolute bottom-[4%] left-[-25%] right-0 z-10 mx-auto flex h-[40%] w-2/3 flex-col gap-4">
      <div className="relative left-1/3 flex gap-4">
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
      </div>
      <div className="relative left-[40%] flex gap-4">
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
      </div>
      <div className="relative left-[25%] flex gap-4">
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
        <Snow className="w-[10%]" />
      </div>
    </div>
  );
};
export default function Icon({
  className = "",
  rain = false,
  lightning = false,
  orb = true,
  clouds = false,
  snow = false,
}) {
  if (rain || lightning || snow) clouds = true;
  if (rain && snow) rain = false;
  console.log({ rain, lightning, orb, clouds, snow });
  return (
    <div className={className + " relative aspect-square bg-black"}>
      {orb ? (
        clouds ? (
          <>
            <Cloud className="absolute left-[3%] top-[15%] z-10 w-1/5" />
            <Cloud className="absolute right-0 top-[-3%] z-10 w-1/3" />
            <Orb className="absolute right-0 top-0 w-1/2" />
            <Cloud className="absolute left-0 right-0 top-[1/5] mx-auto w-2/3" />
          </>
        ) : (
          <Orb className="absolute right-0 top-0 w-1/2" />
        )
      ) : (
        <>
          <Cloud className="absolute left-[20%] right-0 top-[-8%] mx-auto w-2/3" />
          <Cloud className="absolute left-[-20%] right-0 top-[1/5] mx-auto w-2/3" />
        </>
      )}
      {rain ? (
        lightning ? (
          <>
            <Rain className="absolute bottom-[12%] left-[-35%] right-0 z-10 mx-auto h-[40%] w-2/3" />
            <Lightning className="absolute bottom-[17%] left-[25%] right-0 mx-auto h-[25%] w-2/3" />
          </>
        ) : (
          <Rain className="absolute bottom-[12%] left-[-15%] right-0 z-10 mx-auto h-[40%] w-2/3" />
        )
      ) : snow ? (
        lightning ? (
          <>
            <Lightning className="absolute bottom-[17%] left-[25%] right-0 mx-auto h-[25%] w-2/3" />
            <Snowy />
          </>
        ) : (
          <Snowy />
        )
      ) : lightning ? (
        <Lightning className="absolute bottom-[17%] left-[-5%] right-0 mx-auto h-[25%] w-2/3" />
      ) : null}
    </div>
  );
}
