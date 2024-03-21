import React, { useState, useEffect, useRef, useContext } from 'react';
import { config } from '../utils/config';
import { Modal } from '@mui/material';
import { useRouter } from 'next/router';
import { ThreeCircles } from 'react-loader-spinner';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import HomeNav from '../components/HomeNav/HomeNav';
import Modals from '../components/Modal/Modals';
import ContextData from '../contexts/contextData';
import styles from '../styles/home.module.css';
import BgImage1 from '../public/assets/navbar-image1.png';
import BgImage2 from '../public/assets/navbar-image2.png';
import Image from 'next/image';

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const ref = useRef(null);
  const router = useRouter();
  const dataCtx = useContext(ContextData);

  const getWidgetByUserId = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const response = await fetch(`${config.url}/api/widget/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.message);
      }
      const responseData = await response.json();
      if (
        JSON.stringify(responseData.user) !== JSON.stringify(dataCtx.template)
      ) {
        dataCtx.setTemplate(responseData.user);
        console.log(responseData.user);
      }
      setSpinnerVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userId = localStorage.getItem('userId');
      if (userId) {
        dataCtx.setUserId(userId);
        setSpinnerVisible(false);
        getWidgetByUserId();
      } else {
        router.push('/auth/login');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSpinnerVisible(false);
      }
    })();
  }, [dataCtx.template]);

  return (
    <div className={styles.home_container}>
      {spinnerVisible ? (
        <ThreeCircles
          height="50vh"
          width="50vw"
          color="#4fa94d"
          visible={true}
          outerCircleColor="#05a9f7"
          innerCircleColor="#39c0fa"
          middleCircleColor="#7ad1fa"
          wrapperStyle={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <>
          <HomeNav />
          <div className={styles.home_background}>
            <Image height={400} width={400} src={BgImage1} alt="nav-item" />
            <Image height={400} width={400} src={BgImage2} alt="nav-item" />
          </div>
          <div className={styles.container}>
            <div className={styles.add_project_card} onClick={handleOpen}>
              <div className={styles.plus_icon}>
                <i className="bi bi-plus-lg" />
              </div>
              <div className={styles.new_proj}>New Project</div>
            </div>
            <Modal open={open} onClose={handleClose}>
              <Modals
                ref={ref}
                getWidget={getWidgetByUserId}
                onClose={handleClose}
              />
            </Modal>
            {dataCtx.template.map((wid, i) => {
              return (
                <Link key={i} passHref href={`/builder/${wid.id}`}>
                  <ProjectCard wid={wid} />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
