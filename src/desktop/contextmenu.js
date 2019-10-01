import React from 'react';
import './contextmenu.css';
import { zIndexFrames, incrementZIndexStackTrace } from '../globalvariables';
export default class ContextMenu extends React.Component {
    state = {
        visible: false,
    };
    constructor(props)
    {
        super(props);
        
    }
    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    getParentelement()
    {
        /*if(element.parentElement.getAttribute('id')=="Explorer")
        {
            var ele=document.createElement('div');
            ele.innerHTML="new folder";
            this.root.appendChild(ele);
        }*/
        this.root.appendChild(this.props.contextHandle());
    }
    _handleContextMenu = (event) => {
        event.preventDefault();
        
        this.setState({ visible: true });
        
        const clickX = event.clientX;
        const clickY = event.clientY;
        //this.getParentelement(document.elementFromPoint(clickX,clickY));
        this.getParentelement();

        incrementZIndexStackTrace();
        this.root.style.zIndex=zIndexFrames;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;
        
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;
        
        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }
        
        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }
        
        if (top) {
            this.root.style.top = `${clickY + 5}px`;
        }
        
        if (bottom) {
            this.root.style.top = `${clickY - rootH - 5}px`;
        }
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false, });
        if(!this.state)
        this.destroy();
    };
    destroy=()=>{
        let element=document.getElementsByClassName('custom-menu');
        element[0].parentNode.removeChild(element[0]);
    }
    _handleScroll = () => {
        const { visible } = this.state;
        
        if (visible) this.setState({ visible: false, });
    };
    
    render() {
        const { visible } = this.state;
        
        return(visible || null) && 
            <div ref={ref => {this.root = ref}} className="custom-menu">
            </div>
    };
}
