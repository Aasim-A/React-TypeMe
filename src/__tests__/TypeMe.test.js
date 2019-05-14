import React from 'react';
import { render, cleanup } from 'react-testing-library';
import TypeMe, { LineBreak, Delete, Delay } from '../index';

let div;
let cb;

afterEach(() => {
  document.body.removeChild(div);
  div = null;
  cb = null;
  cleanup();
});

describe('<TypeMe /> component', () => {
  it('renders without crashing', done => {
    const { container } = render(<TypeMe />);
    setTimeout(() => {
      div = container;
      expect(div).toMatchSnapshot();
      done();
    }, 1000);
  });

  it('renders children passed as string', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(<TypeMe onAnimationEnd={cb}>hello</TypeMe>);
      div = container;
    }).then(() => {
      done();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(div).toMatchSnapshot();
    });
  });

  it('renders children passed as array', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe onAnimationEnd={cb}>{['hello']}</TypeMe>
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders string passed as prop', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe onAnimationEnd={cb} strings={'hello'} />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders array passed as prop', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe onAnimationEnd={cb} strings={['hello']} />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders multiple items passed as prop', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe onAnimationEnd={cb} strings={['hello', 'there']} />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with className as prop', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe onAnimationEnd={cb} strings={['hello']} className="new" />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with deleted characters', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe
          onAnimationEnd={cb}
          strings={['hello', <Delete characters={4} />, 'ola!']}
        />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders break line', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe
          onAnimationEnd={cb}
          strings={['hello', <LineBreak />, 'there']}
        />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with manually triggered startAnimation', done => {
    new Promise(resolve => {
      const { container, rerender } = render(
        <TypeMe startAnimation={false}>Nope</TypeMe>
      );
      setTimeout(() => {
        rerender(
          <TypeMe
            startAnimation={true}
            onAnimationEnd={() => {
              resolve();
            }}
          >
            Yes
          </TypeMe>
        );
      }, 500);
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
    });
  });

  it('renders with custom cursor character', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe
          onAnimationEnd={cb}
          cursorCharacter="_"
          strings={['hello']}
        />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with hidden cursor after animation ends', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe
          onAnimationEnd={cb}
          hideCursor={true}
          strings={['hello']}
        />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with delay', done => {
    new Promise(resolve => {
      cb = jest.fn(() => {
        resolve();
      });
      const { container } = render(
        <TypeMe
          onAnimationEnd={cb}
          strings={['hello', <Delay ms={100} />, 'there']}
        />
      );
      div = container;
    }).then(() => {
      done();
      expect(div).toMatchSnapshot();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  // it('<TypeMe/> onAnimationEnd called once when animation ends', done => {
  //   let cb;
  //   new Promise(resolve => {
  //     cb = jest.fn(() => {
  //       resolve();
  //     });
  //     const { container } = render(<TypeMe onAnimationEnd={cb}>Hello!</TypeMe>);
  //     div = container;
  //   }).then(() => {
  //     done();
  //     expect(cb).toHaveBeenCalledTimes(1);
  //     expect(div).toMatchSnapshot();
  //   });
  // });
  // it('<TypeMe/> renders with string passed as children', done => {
  //   const { container } = render(<TypeMe />);
  //   setTimeout(() => {
  //     div = container;
  //     expect(div).toMatchSnapshot();
  //     done();
  //   }, 1000);
  // })

  // // renders multiple instances
  // it('<TypeMe/> renders multiple instances', done => {
  //   const { container } = render(<TypeMe />);
  //   setTimeout(() => {
  //     div = container;
  //     expect(div).toMatchSnapshot();
  //     done();
  //   }, 1000);
  // })
});
