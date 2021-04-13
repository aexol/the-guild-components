import React, { useEffect } from 'react';
import { IHeaderModalProps } from './types';
import { HeaderIcon } from './Header.styles';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalWrapper,
  ProductCategory,
  ProductList,
  ProductThumbnail,
  ProductImage
} from './HeaderModal.styles';
import { headerThemedIcons, productThemedIcons } from './Header.assets';
import { useDarkTheme } from '../helpers/theme';

export const HeaderModal: React.FC<IHeaderModalProps> = (props) => {
  const { darkTheme, setDarkTheme } = useDarkTheme();
  const { modalOpen, toggleModal } = props;
  const icons = headerThemedIcons(darkTheme);
  const productIcons = productThemedIcons();

  // TODO: Investigate a better way to handle SB's theme change
  useEffect(() => {
    if (props.sbTheme !== undefined) setDarkTheme(props.sbTheme);
  }, [props.sbTheme]);

  const productCategories = [{
    title: 'Category Name or tags or popularity',
    items: [{
      title: 'Envelop',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.envelop
    }, {
      title: 'Hive',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.hive
    }, {
      title: 'Inspector',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.inspector
    }, {
      title: 'Code Generator',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.codeGen
    }, {
      title: 'CLI',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.cli
    }, {
      title: 'Scalars',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.scalars
    }]
  },
  {
    title: 'Category Name or tags or popularity',
    items: [{
      title: 'Mesh',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.mesh
    }, {
      title: 'Modules',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.modules
    }, {
      title: 'Tools',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.tools
    }, {
      title: 'Sofa',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.sofa
    }, {
      title: 'Angular',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.angular
    }, {
      title: 'Config',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.config
    }, {
      title: 'Whatsapp',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.whatsapp
    }, {
      title: 'Stencil',
      description: 'Modern GraphQL Framework',
      link: '#',
      image: productIcons.stencil
    }]
  }]

  return (
    <Modal isModalOpen={modalOpen} role="dialog">
      <ModalOverlay isModalOpen={modalOpen} tabIndex={-1} onClick={() => toggleModal && toggleModal(false)}></ModalOverlay>
      <ModalWrapper isModalOpen={modalOpen}>
        <ModalHeader>
          <h2>Products by The Guild</h2>
          <HeaderIcon iconType="close" onClick={() => toggleModal && toggleModal(false)}>
            <img src={icons.close} height="24" width="24" alt="Menu close icon" />
          </HeaderIcon>
        </ModalHeader>
        <ModalContent>
          {productCategories.map((category, index) => (
            <ProductCategory key={index}>
              <h3>{category.title}</h3>
              <ProductList>
                {category.items.map(product => (
                  <ProductThumbnail
                    key={product.title}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ProductImage>
                      <img src={product.image} alt={`${product.title} logo`} />
                      <img src={product.image} alt={`${product.title} blurred logo`} />
                    </ProductImage>
                    <span>
                      <h4>{product.title}</h4>
                      <p>{product.description}</p>
                    </span>
                  </ProductThumbnail>
                ))}
              </ProductList>
            </ProductCategory>
          ))}
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
};
