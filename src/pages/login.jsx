import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrello } from "@fortawesome/free-brands-svg-icons"

export const Login = () => {
    return <div className="login">
        <div className="login-name-logo">
            <div className="login-logo fa-trello">
                <FontAwesomeIcon icon={faTrello}/>
            </div>
            <div className="name">Tredux</div>
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus reprehenderit cumque quam pariatur ab neque nostrum iusto voluptates atque, consequatur minima corporis. Et, distinctio assumenda at inventore tempora nobis delectus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, recusandae incidunt sit ipsum nostrum corporis quasi aliquam eum aliquid debitis harum facilis ut repellendus vitae. Expedita perspiciatis tempore repellat repellendus!</p>
    </div>
}