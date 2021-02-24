import React, { ImgHTMLAttributes }from 'react';


import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import './styles.css';

interface Props extends ImgHTMLAttributes<HTMLInputElement> {
    enterprise: any;
}

const CardEnterprise: React.FC<Props> = ({ enterprise }) => {  

    return(
       
        <CardActionArea>
            <CardMedia>
                <img src={ enterprise.gallery[0].path } alt={ enterprise.name} className="media"/>
            </CardMedia>
            <CardContent>

            { enterprise.logotype ? 
                <img src={ enterprise.logotype.path } alt={ enterprise.name} className="logo-media" /> : <p className="enterprise-name">{ enterprise.name }</p>
            }
                <Typography className="textDescription">
                    { enterprise.logotype ? enterprise.logotype.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
                </Typography>
            </CardContent>
        </CardActionArea>
            
    )
}

export default CardEnterprise;