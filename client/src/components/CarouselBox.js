import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import photo1 from "../assets/photo1.jpeg";
import photo2 from "../assets/photo2.jpeg";
import photo3 from "../assets/photo3.jpeg";
import photo4 from "../assets/photo4.jpeg";
import photo5 from "../assets/photo5.jpeg";

export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                
                    <img 
                        className="d-block w-100"
                        src={ photo1 }
                        alt="Photo1"
                    />
                    <Carousel.Caption>
                        <h3>Потрясающие блюда на любой вкус</h3>
                        <p>Большой выбор рецептов со всех уголков Земли</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src={ photo2 }
                        alt="Photo2"
                    />
                    <Carousel.Caption>
                        <h3>Пошаговые инструкции</h3>
                        <p>Наше сообщество с понимаем относится к новичкам, 
                        пошагово расписывая все особенности процесса</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src={ photo3 }
                        alt="Photo3"
                    />
                    <Carousel.Caption>
                        <h3>Поддержка профессионалов </h3>
                        <p>Наше творчество ни раз признавалось достойным среди лучших, 
                        в числе которых - Гордон Рамзи</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src= { photo4 }
                        alt="Photo4"
                    />
                    <Carousel.Caption>
                        <h3>Изысканный вкус</h3>
                        <p>С нашими инструкциями любое ваше творение станет украшением стола</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src={ photo5 }
                        alt="Photo5"
                    />
                    <Carousel.Caption>
                        <h3>Достижения</h3>
                        <p>Наши пользователи - неоднократные победители всевозможных кулинарных конкурсов</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}
