import { React } from "react"

const withScreenSizes = (Component) => {
    return class extends Component{
        state = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        resizeHandler = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        componentDidMount(){
            window.addEventListener("resize", this.resizeHandler)
        }

        componentWillUnmount(){
            window.removeEventListener("resize", this.resizeHandler)
        }
        
        render(){
            const {width, height} = this.state
            return(
                <Component {...this.props} width={width} height={height} />
            )
        }
    }
}

export default withScreenSizes;