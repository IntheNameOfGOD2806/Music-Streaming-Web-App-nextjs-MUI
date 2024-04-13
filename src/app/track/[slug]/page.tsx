import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DetailTrack from "@/components/Music/Detail.Track";
import { sendRequest } from "@/utils/api";
import type { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log("check param:", params);
  //
  const getTrackTitle = async () => {
    const res = await sendRequest<IBackendRes<ITrackTop>>({
      url: `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }api/v1/tracks/${params.slug.trim()}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.access_token, //the token is a variable which holds the token
      },
    });
    // console.log(res);
    if (res && res.data) {
      return res.data.title;
    }
    return;
  };
  // fetch data
  const session = await getServerSession(authOptions);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${await getTrackTitle()}`,
    openGraph: {
      title: "dattran.dev",
      description: "Beyond Your Coding Skills",
      type: "website",

      images: [` https://source.unsplash.com/random`],
    },
  };
}
export async function generateStaticParams() {
  return [
    { slug: "65a4cf1e41de8940d341970b".trim() as string },
    { slug: "65a4cf1e41de8940d341970a".trim() as string },
    { slug: "65a4cf1e41de8940d341970d".trim() as string },
  ];
}
const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
 
  const { slug } = params;
  // console.log("check slug:", slug);
  return (
    <>
    <div style={{display:"none",visibility:"hidden"}}>{slug}</div>
      <DetailTrack params={params} />
    </>
  );
};
export default DetailTrackPage;
