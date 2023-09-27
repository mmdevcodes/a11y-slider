
import i18n from 'i18next';

i18n.init({
  lng: document.documentElement.lang,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        "skipSliderForScreenreader": "Click to skip slider carousel",
        "endOfSlider": "End of slider carousel",
        "toggleAutoplay": "Toggle slider autoplay",
        "displaySlideStatus_first": "Displaying first slide of {{count}} ",
        "previousSlide": "Previous slide",
        "nextSlide": "Next slide",
        "displaySlideStatus": "Displaying slide {{count}} of {{totalSlides}}",
        "moveSliderToItem": "Move slider to item {{count}}"
      }
    },
    de: {
      translation: {
        "skipSliderForScreenreader": "Hier klicken um den Slider zu überspringen",
        "endOfSlider": "Ende des Sliders",
        "toggleAutoplay": "Toggle Slider Autoplay",
        "displaySlideStatus_first": "Zeige erste Slide von {{count}}",
        "previousSlide": "Vorherige Slide",
        "nextSlide": "Nächste Slide",
        "displaySlideStatus": "Zeige Slide {{count}} von {{totalSlides}}",
        "moveSliderToItem": "Gehe zu Slide {{count}}"
      }
    },
    nl: {
      translation: {
        "skipSliderForScreenreader": "Klik om slider carrousel over te slaan",
        "endOfSlider": "Einde van slider carrousel",
        "toggleAutoplay": "Toggle slider autoplay",
        "displaySlideStatus_first": "Eerste dia van  {{count}} weergeven",
        "previousSlide": "Vorige dia",
        "nextSlide": "Volgende dia",
        "displaySlideStatus": "Dia {{count}} van {{totalSlides}} weergeven",
        "moveSliderToItem": "Verplaats schuif naar item {{count}}",
      }
    },
    'en-US': {
      translation: {
        "skipSliderForScreenreader": "Click to skip slider carousel",
        "endOfSlider": "End of slider carousel",
        "toggleAutoplay": "Toggle slider autoplay",
        "displaySlideStatus_first": "Displaying first slide of {{count}}",
        "previousSlide": "Previous slide",
        "nextSlide": "Next slide",
        "displaySlideStatus": "Displaying slide {{count}} of {{totalSlides}}",
        "moveSliderToItem": "Move slider to item {{count}}",
        }
    },
    cz: {
      translation: {
        "skipSliderForScreenreader": "Kliknutím přeskočíte kolotoč posuvníků",
        "endOfSlider": "Konec karuselu jezdce",
        "toggleAutoplay": "Přepnout automatické přehrávání posuvníku",
        "displaySlideStatus_first": "Zobrazení prvního snímku {{count}}",
        "previousSlide": "Předchozí snímek",
        "nextSlide": "Další snímek",
        "displaySlideStatus": "Zobrazení snímku {{count}} z {{totalSlides}}",
        "moveSliderToItem": "Přesunutí posuvníku na položku {{count}}",
      }
    },
    es: {
      translation: {
        "skipSliderForScreenreader": "Haga clic para saltar el carrusel deslizante",
        "endOfSlider": "Fin del carrusel deslizante",
        "toggleAutoplay": "Activar la reproducción automática del control deslizante",
        "displaySlideStatus_first": "Mostrando primera diapositiva de {{count}}",
        "previousSlide": "Diapositiva anterior",
        "nextSlide": "Diapositiva siguiente",
        "displaySlideStatus": "Mostrar diapositiva {{cuenta}} de {{totalDiapositivas}}",
        "moveSliderToItem": "Mover el deslizador al elemento {{count}}",
      }
    },
    fr: {
      translation: {
        "skipSliderForScreenreader": "Cliquez pour sauter le carrousel de curseurs",
        "endOfSlider": "Fin du carrousel de diapositives",
        "toggleAutoplay": "Toggle slider autoplay",
        "displaySlideStatus_first": "Affichage de la première diapositive de {{count}}",
        "previousSlide": "Diapositive précédente",
        "nextSlide": "Diapositive suivante",
        "displaySlideStatus": "Affichage de la diapositive {{count}} de {{totalSlides}}",
        "moveSliderToItem": "Déplacer le curseur vers l'élément {{count}}",
      }
    },
    it: {
      translation: {
        "skipSliderForScreenreader": "Fare clic per saltare il carosello di scorrimento",
        "endOfSlider": "Fine del carosello di diapositive",
        "toggleAutoplay": "Attiva l'autoplay del cursore",
        "displaySlideStatus_first": "Visualizzazione della prima diapositiva di {{count}}",
        "previousSlide": "Diapositiva precedente",
        "nextSlide": "Diapositiva successiva",
        "displaySlideStatus": "Visualizzazione della diapositiva {{count}} di {{totalSlides}}",
        "moveSliderToItem": "Spostare il cursore sull'elemento {{count}}",
      }
    },
    pl: {
      translation: {
        "skipSliderForScreenreader": "Kliknij, aby pominąć karuzelę suwaka",
        "endOfSlider": "Koniec karuzeli suwaków",
        "toggleAutoplay": "Toggle slider autoplay",
        "displaySlideStatus_first": "Wyświetlanie pierwszego slajdu {{count}}",
        "previousSlide": "Poprzedni slajd",
        "nextSlide": "Następny slajd",
        "displaySlideStatus": "Wyświetlanie slajdu {{count}} z {{totalSlides}}",
        "moveSliderToItem": "Przesunięcie suwaka do elementu {{count}}",
      }
    },
    sv: {
      translation: {
        "skipSliderForScreenreader": "Klicka för att hoppa över sliderkarusellen",
        "endOfSlider": "Slut på skjutreglage-karusell",
        "ToggleAutoplay": "Växla skjutreglagets autoplay",
        "displaySlideStatus_first": "Visar första bilden av {{count}}",
        "previousSlide": "Föregående bild",
        "nextSlide": "Nästa bild",
        "displaySlideStatus": "Visar bild {{count}} av {{totalSlides}}",
        "moveSliderToItem": "Flytta skjutreglaget till objektet {{count}}",
      }
    }
  }
});

export default i18n;