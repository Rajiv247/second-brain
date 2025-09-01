import { Shareicon } from "../Icon/ShareIcon";


interface CardProps {
    title :string;
    link : string;
    type : "twitter" |"youtube";
}

export function Card( {title, link,type} : CardProps){

    return(
        <div>
            <div className =" p-4 bg-white rounded-md border-gray-200 max-w-72 shadow-lg border min-h-64 min-w-72">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center text-md">
                            <div className="text-gray-500 p-2">
                                <Shareicon/>
                            </div>
                            {title}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-800">
                            <a href={link} target="_blank">
                                <Shareicon/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pt-4">

                     {type === "youtube" && (
          <iframe
            className="w-full h-64 rounded-md"
            // ⚡ Most devs just replace watch with embed
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {/* Twitter Embed */}
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link}></a>
          </blockquote>
        )}
                    </div>
            </div>
        </div>
    )

}