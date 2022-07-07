import { useParams } from "react-router-dom";

export default function NameListDetail() {
    const params = useParams()
    return (
        <div>
            <p>1111111111</p>
            {params.id}
        </div>
    )
}

NameListDetail.route = { [MENU_PATH]: "/namelist/:id"};