import React, { useState } from 'react'
import './RemarkHistory.css'

const remarks = [
  {
    id: 1,
    role: 'io',
    name: 'Rajesh Patil',
    roleLabel: 'Inspection Officer',
    message:
      'गट क्रमांक १४२ ची सर्वेक्षण नोंद अपूर्ण आहे. पिकाच्या प्रकाराचे रकाने रिकामे ठेवण्यात आले आहेत आणि जमिनीच्या क्षेत्रफळाची मोजणी ७/१२ उताऱ्याशी जुळत नाही. कृपया नोंदीची पडताळणी करा आणि अचूक तपशीलांसह ती पुन्हा सादर करा.',
    time: '28 Apr · 10:15 AM',
    // attachment: '7-12_extract_gat142.pdf',
  },
  {
    id: 2,
    role: 'tl',
    name: 'Suresh Deshmukh',
    roleLabel: 'Talathi',
    message:
      'नोंद घेतली, साहेब. शेतकऱ्याच्या पुष्टीकरणाअभावी पिकाचा प्रकार निश्चित होणे प्रलंबित होते. मी आता तो सोयाबीन असा अद्ययावत केला आहे. क्षेत्राच्या मोजमापाबाबतची तफावत ही सीमावादाशी संबंधित आहे; हा वाद सध्या ग्रामपंचायत स्तरावर निवारणासाठी प्रक्रियेत आहे.',
    time: '28 Apr · 2:40 PM',
    // attachment: 'boundary_dispute_gp_letter.pdf',
  },
  {
    id: 3,
    role: 'io',
    name: 'Rajesh Patil',
    roleLabel: 'Inspection Officer',
    message:
      'पिकाचा प्रकार स्वीकारण्यात आला आहे. तथापि, अंतिम सादर करण्यापूर्वी सीमावाद (हद्दीचा वाद) निकाली काढणे आवश्यक आहे. कृपया ५ कामकाजाच्या दिवसांच्या आत ग्रामपंचायतीकडून यासंदर्भातील अधिकृत ठराव पत्र प्राप्त करून घ्यावे.',
    time: '30 Apr · 9:30 AM',
    attachment: null,
  },
  {
    id: 4,
    role: 'tl',
    name: 'Suresh Deshmukh',
    roleLabel: 'Talathi',
    message:
      'समजले, साहेब. मी सरपंचांकडे लेखी विनंती सादर केली आहे. यावरील सुनावणी २ मे २०२५ रोजी नियोजित आहे. ठराव पत्र जारी होताच, मी ते त्वरित अपलोड करेन.',
    time: '30 Apr · 11:42 AM',
    attachment: null,
  },
]

const Avatar = ({ role }) => (
  <div className={`rh-avatar ${role}`}>
    {role === 'io' ? 'IO' : 'TL'}
  </div>
)

const RemarkBubble = ({ remark }) => {
  const { role, name, roleLabel, message, time, attachment } = remark
  return (
    <div className={`rh-msg ${role}`}>
      <Avatar role={role} />
      <div className={`rh-content ${role}`}>
        <span className="rh-name">{roleLabel} — {name}</span>
        <div className={`rh-bubble ${role}`}>{message}</div>
        {attachment && (
          <div className={`rh-attach ${role}`}>
            📎 {attachment}
          </div>
        )}
        <span className="rh-time">{time}</span>
      </div>
    </div>
  )
}

const Divider = ({ label }) => (
  <div className="rh-divider">
    <span>{label}</span>
  </div>
)

const RemarkHistory = ({ currentUserRole = 'tl' }) => {
  const [replyText, setReplyText] = useState('')

  const handleSubmit = () => {
    if (!replyText.trim()) return
    // TODO: connect to your API here
    console.log('Submitting remark:', replyText)
    setReplyText('')
  }

  return (
    <div className="rh-wrap">

      {/* Stats Bar */}
      <div className="rh-stats">
        <div className="rh-stat">
          <p className="rh-stat-label">Total Remarks</p>
          <p className="rh-stat-val">{remarks.length}</p>
        </div>
        <div className="rh-stat">
          <p className="rh-stat-label">Initiated by</p>
          <p className="rh-stat-val">Inspection Officer</p>
        </div>
        <div className="rh-stat">
          <p className="rh-stat-label">Last Activity</p>
          <p className="rh-stat-val">Today, 11:42 AM</p>
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="rh-thread">
        <Divider label="28 Apr 2025" />
        <RemarkBubble remark={remarks[0]} />
        <RemarkBubble remark={remarks[1]} />

        <Divider label="30 Apr 2025" />
        <RemarkBubble remark={remarks[2]} />
        <RemarkBubble remark={remarks[3]} />
      </div>

      {/* Reply Box */}
      <div className="rh-reply">
        <p className="rh-reply-label">Add a remark reply</p>
        <textarea
          className="rh-textarea"
          placeholder="Type your remark here..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <div className="rh-actions">
          <button className="rh-btn">+ Attach document</button>
          <button className="rh-btn primary" onClick={handleSubmit}>
            Submit remark
          </button>
        </div>
      </div>

    </div>
  )
}

export default RemarkHistory
