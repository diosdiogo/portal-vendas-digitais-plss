import React, { Component, MouseEventHandler, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Help from '../../components/Help';
import Feedback from '../../components/Feedback';
import SmallButton from '../../components/SmallButton';
import PageFooter from '../../components/PageFooter';
import TagManager from 'react-gtm-module';

import { Typology } from '../../store/ducks/typologies/types';
import { Image, ImagesTypes } from '../../store/ducks/imagesGallery/types';
import { Lead } from '../../store/ducks/leads/types';
import { Step } from '../../store/ducks/steps/types';
import { ApplicationState } from '../../store';
import * as ImagesActions from '../../store/ducks/imagesGallery/actions';
import * as TypologyActions from '../../store/ducks/typologies/actions';
import InnerImageZoom from 'react-inner-image-zoom';

import * as LeadsActions from '../../store/ducks/leads/actions';
import * as StepActions from '../../store/ducks/steps/actions';
import history from '../../utils/history';

import unavaliableImg from '../../assets/images/unavailable-horizontal.svg';
import glass3d from '../../assets/images/3D-glass.svg';
import { FiXCircle } from 'react-icons/fi';

import './styles.css';
import './carousel.min.css';

interface StateProps {
    typologies: Typology[]
    images: Image
    leads: Lead
    steps: Step[]
    lastPage: string
}

interface DispatchProps {
    updateImage(data: Image): void
    updateStep(page: string): void
    updateTypologies(data: Typology[]): void
    updateImageField(field: string, value: any): void
    updateLeadField(field: string, value: string | number | boolean): void
}

type Props = StateProps & DispatchProps;

class Gallery extends Component<Props> { 
    state = {
        previewsPage: '/enterprise',
        show: false,
        isLoading: false,
        cover: '',
        showTypologies: false,
        selectTypologies: 0
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.steps.find(({page}) => page === this.state.previewsPage)?.page) {
            if (!this.props.steps.find(({page}) => page === window.location.pathname)?.page)
                this.props.updateStep(window.location.pathname);
        }
        else
            history.push(this.props.lastPage);

        this.popImage();

        this.setState({
            cover: this.props.typologies.find(({id}) => id === this.props.leads.typology_id)?.cover,
        });
        console.log(this.state.cover)
        this.setState({
            showTypologies:  this.state.cover !== '' ? true : false ,
        })
        console.log(this.state.showTypologies)

        this.setState({
            selectTypologies: this.props.typologies.find(({id}) => id === this.props.leads.typology_id)?.id
        })
        
    }



    handleOnClick(e: FormEvent, value:any) {
        
        e.preventDefault();

        this.setState({
            cover: value.typology.cover
        })

        this.setState({
            showTypologies:  this.state.cover !== '' ? false : true ,
        })

        this.setState({
            selectTypologies: value.typology.id
        })
        
        if (!this.state.isLoading)
            this.setState({isLoading: true});
        else
            return;

        TagManager.dataLayer({
            dataLayer: {
                event: 'selecaoTipologia',
                'selecaoTipologia': value.typology.name,
            }
        });

        this.props.updateLeadField("typology_id", value.typology.id);
        this.props.updateLeadField("typology_name", value.typology.name);
        history.push("gallery");
    }

    showModal () {
        this.setState({show: true});
        this.toggleFullScreen();
    };
  
    hideModal () {
        this.setState({show: false});
        this.toggleFullScreen();
    };

    toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;
      
        var requestFullScreen = docEl.requestFullscreen;
        var cancelFullScreen = doc.exitFullscreen;
      
        if(!doc.fullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
    }

    popImage() {
        var imgs = Array<any>();
        this.props.images.gallery.map(image => {
            if (image.category !== 'view360') {
                imgs.push(image);
            }
        })
        
        return imgs
    }
    
    render() {      
        const images = this.popImage();
        const { typologies } = this.props;
        return (
            <div id="main-page">
                <div id="content-page">
                    <PageHeader />
                    <div className="slogan">
                        <p>
                            <strong>É só deslizar as imagens do carrossel para conhecer melhor o seu futuro lar.</strong>
                        </p>
                    </div> 
                    
                    <div className="gallery-carousel">
                        {images[0] ? 
                            <Carousel
                                showStatus={false} 
                                infiniteLoop={true}
                                showThumbs={false}
                                swipeable={true}
                                emulateTouch={true}>
                                { images.map(image => {
                                    return (
                                        <div key={image.id} >
                                            { image.category === 'video' ? 
                                            <ReactPlayer className="gallery-video"
                                                key="video" 
                                                url={image.path}
                                                playing={false} 
                                            /> : image.category === 'gallery' && <img alt={image.name} src={image.path} />
                                            }
                                        </div>  
                                    )
                                })}
                            </Carousel> : <img className="no-image" alt="Indisponível" src={unavaliableImg} />
                        }                        
                    </div>      
                    
                    <div className="div-tour">
                        <Modal path={this.props.images.gallery.find(({category}) => category === 'view360')?.path} images={this.props.images} show={this.state.show} handleClose={this.hideModal.bind(this)}></Modal>
                        { this.props.images.gallery.find(({category}) => category === 'view360')?.path && <button id="VirtualTour" type="button" className="btn-tour" onClick={this.showModal.bind(this)}><img src={ glass3d } alt="tour" className="tour-icon"/> Quero iniciar o tour virtual</button> }             
                    </div>
                    
                    <div className="slogan">
                        <p>
                            <strong>escolha a tipologia que mais tem a ver com sua você.</strong>
                        </p>
                    </div>
                    
                    <div className="card-typology" style={{display: this.state.showTypologies ? 'none' : 'block' }}>
                        <InnerImageZoom 
                            src={this.state.cover} 
                            zoomSrc={this.state.cover}
                            alt={this.props.leads.typology_name} 
                            fullscreenOnMobile={true} 
                            moveType="drag"
                        />
                    </div> 
                   
                    <div className="">
                        { typologies.map(typology => (
                            <div key={typology.id} className="buttons-block">
                                <button 
                                    className={`btn-bottom btn-typology ${ this.state.selectTypologies === typology.id ? 'active' : '' }`}
                                    onClick={(e) => {this.handleOnClick(e, {typology})}}>
                                        {typology.name}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="buttons-sm-block">
                        <SmallButton 
                            path="/block"
                            cssclass="btn-sm-top"
                            title="Avançar"
                        />

                        <SmallButton 
                            path="/enterprise"
                            cssclass="btn-sm-bottom"
                            title="Voltar"
                        />
                    </div>
                </div>
                <PageFooter />
            </div>
        )
    }
}

interface ModalProps {
    handleClose: MouseEventHandler;
    show: boolean;
    images: Image;
    path: string | undefined;
}

const Modal: React.FC<ModalProps> = (props) => {    
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
    
    return (
        <div id="gallery-page" className={showHideClassName}>
            <section id="gallery-page-content" className="modal-main">
                <div className="box-help">
                    <div className="btn-close">
                        <a onClick={props.handleClose}>
                            <FiXCircle size={32} />
                        </a>
                    </div>      

                    <div className="view360">
                        <iframe title="Visão 360" src={props.path}></iframe>
                    </div>             
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = (state: ApplicationState) => ({
    images: state.images.data,
    typologies: state.typologies.data,
    leads: state.leads.data,
    steps: state.steps.pages,
    lastPage: state.steps.lastPage
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...LeadsActions, ...TypologyActions, ...ImagesActions, ...StepActions
    }, dispatch
);

export default connect(mapStateToProps,mapDispatchToProps)(Gallery);