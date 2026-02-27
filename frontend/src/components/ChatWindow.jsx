import MessageBubble from './MessageBubble'

const ChatWindow = () => {
  return (
    <div className='md:w-full  min-h-screen bg-gray-900 mx-auto '>
      <h1 className='text-center text-2xl py-5 text-white font-bold'>MeowGPT</h1>
      <MessageBubble />
    </div>
  )
}

export default ChatWindow