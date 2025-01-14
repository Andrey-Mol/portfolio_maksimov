import React, { useState } from "react";
import "./Home.css";

const Home = () => {
    const [selectedCard, setSelectedCard] = useState(null); // Состояние выбранной карточки

    const cards = [
        { id: 1, title: "Personal Projects", front: "project1.png", back: "project_banner.png", content: "This is my personal favorite projects that I’ve done for myself & my audience", gallery: ["img1.png", "img2.png", "img3.png", "img1.png", "img2.png", "img3.png", "img1.png", "img2.png", "img3.png", "img1.png", "img2.png", "img3.png", "img1.png", "img2.png", "img3.png", "img1.png", "img2.png", "img3.png"] },
        { id: 2, title: "Apparel Print Designs", front: "project2.png", back: "project_banner.png", content: "Content for Custom Typography", gallery: ["img1.png", "img2.png", "img3.png"] },
        { id: 3, title: "Custom Typography", front: "project3.png", back: "project_banner.png", content: "Content for Apparel Print Designs", gallery: ["img1.png", "img2.png", "img3.png"] },
        { id: 4, title: "Album Art Design", front: "project4.png", back: "project_banner.png", content: "Content for Album Art Design", gallery: ["img1.png", "img2.png", "img3.png"] },
    ];

    const handleCardClick = (id) => {
        setSelectedCard(selectedCard === id ? null : id); // Сбрасываем, если выбран повторно
    };

    const selectedCardData = cards.find((card) => card.id === selectedCard);


    return (
        <div className="home">
            <h1 className="home-title">
                Hey, I’m Aleksandr Maksimov — this is where my graphic design, custom lettering, and apparel prints speak for themselves. Have fun ;)
            </h1>

            <div className="card-container">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${selectedCard === card.id ? "selected" : ""}`}
                        onClick={() => handleCardClick(card.id)}
                        style={{
                            backgroundImage: `url(${require(`../images/${card.front}`)})`, // Устанавливаем фон из поля front
                            backgroundSize: 'cover', // Масштабируем картинку по размеру карточки
                            backgroundPosition: 'center', // Центрируем картинку
                        }}
                    >
                        {selectedCard === card.id && <div className="checkmark">V</div>} {/* Добавляем checkmark */}
                        <div className="card-footer">
                            <div className="card-title">{card.title}</div>
                        </div>
                    </div>
                ))}
            </div>



            {selectedCard !== null && (
                <div className="content-section">
                    <div
                        className="content-banner"
                        style={{
                            backgroundImage: `url(${require(`../images/${selectedCardData.back}`)})`, // Устанавливаем фон
                            backgroundSize: 'contain', // Картинка будет полностью видна
                            backgroundRepeat: 'no-repeat', // Избегаем повторения картинки
                            backgroundPosition: 'center', // Центруем картинку
                            width: '100%', // Ширина баннера 100%
                            aspectRatio: '4 / 1', // Соотношение сторон (замените на нужное)
                        }}
                    >
                        <h1>{selectedCardData.title}</h1>
                        <h2>{selectedCardData.content}</h2>
                    </div>
                    <div className="gallery">
                        {selectedCardData.gallery.map((image, index) => (
                            <img key={index} src={require(`../images/${image}`)} alt={`Gallery ${index}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
