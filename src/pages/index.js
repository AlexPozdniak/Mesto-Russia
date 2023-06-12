import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import './index.css'
import {API_CONFIG, config, profileSelectors, UI_ELEMENTS} from "../utils/constants";
import {Api} from "../components/Api";
import {PopupWithDeletion} from "../components/PopupWithDeletion";

const {
  BUTTON,
  INPUT,
  FORM,
  SAVE_BUTTON,
} = UI_ELEMENTS;

const api = new Api(API_CONFIG);

const bioEdit = new UserInfo(profileSelectors);

api.getData()
    .then(res => {
      const [user, cards] = res;
      bioEdit.setUserInfo(user);
      bioEdit.setUserAvatar(user.avatar);
      cardList.renderItems(cards);
    })
    .catch(err => {
      console.log(err);
    });

const cardList = new Section(
  {
    renderer: createCard,
  },
  '.elements__list',
);

function createCard(card) {
  const newCard = new Card(
    card,
    {
      handleCardClick: () => {
        cardPopup.open(card.name, card.link);
      },
      deleteCard: (cardId) => {
        confirmationPopup.open();

        confirmationPopup.getConfirm(() => {
          api.deleteCard(cardId)
            .then(() => {
              newCard.delete();
              confirmationPopup.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      toggleLike: (cardId) => {
        if (newCard.hasUserLike) {
          api.deleteLike(cardId)
            .then((res) => {
              newCard.setLikes(res.likes)
            })
            .catch((err) => console.log(err))
        } else {
          api.putLike(cardId)
            .then((res) => {
              newCard.setLikes(res.likes)
            })
            .catch((err) => console.log(err))
        }
      },
    },
    '.elements__list',
    bioEdit.userId,
  );

  cardList.addItem( newCard.render() );
}

const cardPopup = new PopupWithImage('.popup_type_preview-card');
cardPopup.setEventListeners();

const confirmationPopup = new PopupWithDeletion('.popup_type_confirm-deletion');
confirmationPopup.setEventListeners();

const popupBioEdit = new PopupWithForm(
  {
    handleFormSubmit: (user) => {
      popupBioEdit.showLoadProcess('...Сохранение');
      api.patchUserInfo(user)
        .then((res) => {
          bioEdit.setUserInfo(res)
          popupBioEdit.close()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          popupBioEdit.showLoadProcess('Сохранить')
        })
    }
  },
  '.popup_type_profile'
);
popupBioEdit.setEventListeners();

const popupAddCard = new PopupWithForm(
  {
    handleFormSubmit: (card) => {
      popupAddCard.showLoadProcess('...Сохранение');
      api.createCard(card)
        .then((res) => {
          createCard(res);
          popupAddCard.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          popupAddCard.showLoadProcess('Создать');
        })
    }
  },
  '.popup_type_add-card'
);
popupAddCard.setEventListeners();

const popupSetAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupAddCard.showLoadProcess('...Сохранение');
      api.setUserAvatar(data)
        .then((res) => {
          bioEdit.setUserAvatar(res.avatar);
          popupSetAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          popupAddCard.showLoadProcess('Сохранение');
        })
    }
  },
  '.popup_type_change-avatar'
);
popupSetAvatar.setEventListeners();

const cardValidator = new FormValidator(config, FORM.CARD);
const bioValidator = new FormValidator(config, FORM.BIO);
const avatarValidator = new FormValidator(config, FORM.AVATAR);

cardValidator.enableValidation();
bioValidator.enableValidation();
avatarValidator.enableValidation();

BUTTON.AVATAR_EDIT.addEventListener('click', () => {
  avatarValidator.hideErrors();
  INPUT.AVATAR.value = '';
  SAVE_BUTTON.AVATAR.disabled = true;
  popupSetAvatar.open();
});

BUTTON.ADD_CARD.addEventListener('click', () => {
  cardValidator.hideErrors();
  popupAddCard.open();
  cardValidator.toggleButtonState();
});

BUTTON.BIO_EDIT.addEventListener('click', () => {
  bioValidator.hideErrors();
  INPUT.TITLE.value = bioEdit.getUserInfo().name;
  INPUT.DESCRIPTION.value = bioEdit.getUserInfo().about;
  SAVE_BUTTON.BIO.disabled = true;
  popupBioEdit.open();
});

