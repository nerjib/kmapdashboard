import React from 'react'
import KDM from '../../../src/assets/img/kaduna-map.png'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import axios from 'axios'

import { makeStyles } from "@material-ui/core/styles";





import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);



const KDMap = () => {
    const classes = useStyles();

    return (
        <div>
  <GridContainer>
                 <GridItem xs={12} sm={10} md={12}>
                     <Card>
                        <CardHeader color="warning" stats icon>
                                     <h2 className={classes.cardTitle}>MAP</h2>
                        </CardHeader>
                    </Card>
                    <CardBody>
          
            <Map/>
            </CardBody>
            </GridItem>
            </GridContainer>
        </div>
    )
}



const Map = () =>{
    return(
        <div>
        <img src={KDM} usemap="#image-map"/>
<map name="image-map">
    <area target="" label='Birnin Gwari' alt="Birnin Gwari" title="Birnin Gwari" href="#/reportsbylga/Birnin Gwari"  coords="178,118,215,52,174,69,181,93,166,90,188,58,211,77,179,170,194,52,228,55,223,49,217,73,32,265,50,149,240,86,103,221,40,273,40,187,18,254,30,256,21,181,257,100,229,196,171,165,140,226,32,208" shape="poly" data-name="rrr"/>
    <area target="" alt="Giwa" title="Giwa" href="#/reportsbylga/Giwa" coords="351,111,270,69,278,61,294,65,305,67,312,56,314,45,321,37,330,37,338,48,347,48,356,56,361,61,359,69,356,77,355,86,357,94,365,97,367,109,363,117,358,121,348,124,335,127,320,124,312,122,306,127,304,137,286,166,298,148,267,171,254,167,250,160,251,148,258,138,262,122,265,105,269,91,277,86,329,50,266,111,282,125" shape="poly"/>
    <area target="" alt="Igabi" title="Igabi" href="#/reportsbylga/Igabi" coords="256,171,264,171,275,173,284,169,288,164,296,150,300,145,303,137,315,122,326,125,307,130,336,129,353,130,363,130,372,134,392,135,410,142,412,149,403,157,400,169,406,175,407,181,417,197,428,204,436,204,444,215,451,229,433,236,416,246,404,243,399,239,390,227,373,228,364,231,351,236,342,238,337,240,333,231,332,220,322,218,315,219,311,229,306,239,305,250,298,247,290,247,282,251,282,261,278,270,272,258,274,238,274,219,267,210,262,201,259,192,256,183" shape="poly"/>
    <area target="" alt="Chikun" title="Chikun" href="#/reportsbylga/Chikun" coords="159,210,177,171,221,192,256,195,263,208,270,214,271,236,270,271,278,274,283,262,283,255,296,251,305,254,315,264,327,252,342,243,357,239,373,235,385,230,400,245,359,290,354,305,345,320,323,329,267,350,197,334,215,312,238,286,224,275,209,275,216,250,204,233,184,209" shape="poly"/>
    <area target="" alt="Kachia" title="Kachia" href="#/reportsbylga/Kachia" coords="289,350,338,329,363,321,399,353,462,337,447,388,448,419,475,435,467,458,436,463,404,430,377,456,351,462,316,452,303,446,272,411,291,403" shape="poly"/>
    <area target="" alt="Kagarko" title="Kagarko" href="#/reportsbylga/Kagarko" coords="274,475,324,455,348,462,375,461,402,434,435,464,452,465,433,491,408,527,376,493,361,486,339,506,319,502,285,499,287,488,277,485" shape="poly"/>
    <area target="" alt="Jaba" title="Jaba" href="#/reportsbylga/Jaba" coords="434,494,448,473,460,459,480,446,484,457,491,471,474,478,464,490,459,505,453,512,447,500" shape="poly"/>
    <area target="" alt="Jemaa" title="Jemaa" href="#/reportsbylga/Jemaa" coords="452,516,464,505,467,487,481,476,507,467,526,453,537,472,577,462,582,478,563,496,545,524,510,528,483,563,474,539,464,525" shape="poly"/>
    <area target="" alt="Sanga" title="Sanga" href="#/reportsbylga/Sanga" coords="483,574,509,535,509,527,541,528,561,505,584,478,597,496,607,504,605,520,596,529,596,544,586,563,565,584,539,544,517,541,508,548" shape="poly"/>
    <area target="" alt="Kaura" title="Kaura" href="#/reportsbylga/Kaura" coords="538,469,527,450,536,434,569,431,569,418,585,423,578,435,578,451,567,461" shape="poly"/>
    <area target="" alt="Zangon Kataf" title="Zango Kataf" href="#/reportsbylga/Zango Kataf" coords="491,466,481,451,476,435,449,415,448,394,462,345,466,338,501,330,522,354,548,366,563,387,567,410,567,427,540,427,527,448,510,463" shape="poly"/>
    <area target="" alt="Kauru" title="Kauru" href="#/reportsbylga/Kauru" coords="502,323,482,291,460,284,460,235,444,209,466,199,488,208,504,210,533,227,551,235,536,267,539,290,549,303,561,338,561,359,582,357,592,362,590,405,586,417,571,411,571,391,562,373,540,353,523,351" shape="poly"/>
    <area target="" alt="Lere" title="Lere" href="#/reportsbylga/Lere" coords="567,201,576,215,589,210,599,215,604,226,615,231,624,232,626,245,614,258,624,278,621,292,595,315,604,354,588,355,560,357,559,307,539,283" shape="poly"/>
    <area target="" alt="Kajuru" title="Kajuru" href="#/reportsbylga/Kajuru" coords="403,246,414,249,429,237,455,237,459,283,482,296,495,322,466,332,396,349,358,311,364,290" shape="poly"/>
    <area target="" alt="Kubau" title="Kubau" href="#/reportsbylga/Kubau" coords="457,201,461,184,481,171,514,145,489,117,487,101,511,104,531,104,544,105,553,95,563,95,573,108,583,117,580,149,580,195,567,196,556,205,550,224,538,224,505,206,471,196" shape="poly"/>
    <area target="" alt="Soba" title="Soba" href="#/reportsbylga/Soba" coords="442,206,461,183,479,170,512,138,487,120,465,90,432,84,406,98,410,126,409,156,405,171,415,189" shape="poly"/>
    <area target="" alt="Ikara" title="Ikara" href="#/reportsbylga/Ikara" coords="546,98,524,82,487,47,479,36,484,16,460,25,471,46,474,69,464,80,480,90,496,97,526,104" shape="poly"/>
    <area target="" alt="Makarfi" title="Makarfi" href="#/reportsbylga/Makarfi" coords="426,75,425,58,435,32,454,31,465,58,470,64,463,72,447,76" shape="poly"/>
    <area target="" alt="Kudan" title="Kudan" href="#/reportsbylga/Kudan" coords="405,48,418,60,423,78,404,92,396,81,383,77,368,69" shape="poly"/>
    <area target="" alt="Sabon Gari" title="Sabon Gari" href="#/reportsbylga/Sabon Gari" coords="363,71,375,81,393,82,401,97,393,105,371,98,355,88,357,78" shape="poly" data-name="Sun"/>
    <area target="" alt="Zaria" title="Zaria" href="#/reportsbylga/Zaria" coords="386,110,403,110,401,135,370,136,361,118,369,109,371,101" shape="poly"/>
    <area target="" alt="Kaduna North" title="Kaduna North" href="#/reportsbylga/Kaduna North" coords="316,230,323,225,331,235,326,244,317,245" shape="poly"/>
    <area target="" alt="Kaduna South" title="Kaduna South" href="#/reportsbylga/Kaduna South" src='' coords="318,247,319,254,316,259,307,250,311,238" shape="poly"/>
    </map>
</div>
    )
}

export default KDMap;