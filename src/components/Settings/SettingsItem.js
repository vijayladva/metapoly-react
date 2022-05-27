import React, { useEffect, useRef, useState } from 'react'

// Styles
import styles from './index.module.scss'

// Images
import upload from '../../assets/images/upload.svg'
import inst from '../../assets/images/inst.svg'

// validator
import Validator from "simple-react-validator";
import { useForceUpdate } from '../modules/ErrorMessage/ErrorMessage';

// Components
import Button from '../modules/Button/Button'
import InputGroup from '../modules/InputGroup/InputGroup'
import { authService } from '../../services';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Rings } from 'react-loader-spinner';

const SettingsItem = ({field, inputType, placeholder, label, value, oldImage,disabled=true,validation=''}) => {
    const [newImage, setNewImage] = useState()
    const [file,setFile] = useState(null)
    const [currentValue, setCurrentValue] = useState(value)
    const [newValue, setNewValue] = useState('')
    const [oldValue, setOldValue] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [loader, setLoader] = useState(false)
    const _U_ID = useSelector(state => state.common.user?.unique_id || '')
    const dispatch = useDispatch()
    const validator = useRef(new Validator({ autoForceUpdate: { forceUpdate: useForceUpdate() } }));

    useEffect(() => {
        setCurrentValue(value)
    },[value])

    const saveChanges = () => {
        if (validator.current.allValid()) {
            let data = {}
            if(field === 'Email') {
                data.email = newValue
            } else if( field === 'Username') {
                data.username = newValue
            } else if( field === 'Profile picture' && file) {
                data = new FormData()
                data.append('image',file)
            }
            // To update email, username and profile_picture field
            if(Object.keys(data).length || file) {
                if(loader) return
                setLoader(true)
                authService.updateProfile(_U_ID,data).then(res => {
                    setLoader(false)
                    const { code, message } = res.data;
                    if (code === 200) {
                        setIsEditing(false)
                        if(file) oldImage = res.data?.data?.profile_picture
                        setFile(null)
                        if (newValue) setCurrentValue(newValue)
                        if(message) toast(message, { type: 'success' })
                        dispatch({type:'SET_USER_DATA',payload:res.data?.data || {}});
                    } else {
                        toast(message || 'Something went wrong!', { type: 'error' })
                    }
                });
            } else if (field === 'Password') {
                // To update password field
                if(loader) return
                setLoader(true)
                authService.updatePassword(_U_ID,{current_password: oldValue,password: newValue})
                .then(res => {
                    setLoader(false)
                    const { code, message } = res.data;
                    if (code === 200) {
                        setIsEditing(false)
                        setOldValue('')
                        setCurrentValue('')
                        if(message) toast(message, { type: 'success' })
                        dispatch({type:'SET_USER_DATA',payload:res.data?.data || {}});
                    } else {
                        toast(message || 'Something went wrong!', { type: 'error' })
                    }
                });
            }
        } else validator.current.showMessages()
    }

    const closeEditing = () => {
        setIsEditing(false)
        setFile(null)
        setNewImage(null)
        setOldValue('')
    }

    const handleClick = () => {
        if (isEditing) {
            saveChanges()
        } else {
            setIsEditing(true)
            validator.current.hideMessages()
        }
    }

    const downloadImage = e => {
        if (e.target.files.length > 0)
            setNewImage(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
    }

    return (
        <div className={styles.settingsItem}>
            <div className={styles.settingsItemWrap}>
                <div className={styles.settingsItemTitle}>
                    {field}
                </div>
                {loader ? <div className={styles.loaderDiv}>Loading... <Rings wrapperClass={styles.loader} color="#f6b830" height={50} width={50} /></div> :<div className={styles.settingsItemBtnsWrap}>
                    <Button className={styles.settingsItemBtn} type={'button'} onClick={handleClick}>
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                    {
                        isEditing && (
                            <Button className={styles.settingsItemBtn} type={'button'} onClick={closeEditing} red>
                                Discard
                            </Button>
                        )
                    }
                </div>}
            </div>
            {
                isEditing && (<>
                    {
                        oldImage ? (<>
                            <div className={styles.settingsItemImageWrap}>
                                <img src={newImage ? newImage : oldImage} alt='ava'/>
                            </div>
                            <label className={styles.settingsItemImageLabel} htmlFor='uploadPhoto'>
                                <Button className={styles.settingsItemImageBtn} type={'button'}>
                                    Upload
                                </Button>
                                <img src={upload} alt='upload'/>
                            </label>
                            <input className={styles.settingsItemImageInp} type='file' id='uploadPhoto'
                                   accept='image/png, image/jpeg' onChange={downloadImage} onClick={e => e.target.value = ''}/>
                        </>) : (
                            <div className={styles.settingsItemEdit}>
                                <InputGroup
                                    type={inputType}
                                    value={currentValue}
                                    placeholder={placeholder}
                                    label={label}
                                    id={`id_${label}`}
                                    disabled={disabled}
                                    smallMargin
                                    onChange={setOldValue}
                                    hasError={validator.current.message(label, oldValue, `required${validation}`)}
                                />
                                <InputGroup
                                    type={inputType}
                                    placeholder={`New ${placeholder}`}
                                    label={`New ${label}`}
                                    id={`new_id_${label}`}
                                    smallMargin
                                    onChange={setNewValue}
                                    hasError={validator.current.message(`New ${label}`, newValue, `required${validation}`)}
                                />
                            </div>
                        )
                    }
                </>)
            }
        </div>
    )
}

export default SettingsItem
